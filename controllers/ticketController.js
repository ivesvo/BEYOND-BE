const Ticket = require('../models/ticket')
const Event = require('../models/event')
const { catchAsync } = require('./errorController')



exports.createTicket = catchAsync(async (req, res, next) => {
    const { event, user } = req.body
    if (!event || !user){
        next(new AppError, 401, "please provide all the data required to create an experience")
       
    }
    const newtix = await Ticket.create({
        event: event,
        user: user,

    })
    res.status(201).json({
        status: "Success",
        data: newtix
    })
})

exports.getTicketList =  catchAsync (async (req,res,next)=>{ 
    const ticketList = await Ticket.find({}).populate({ path: "event",  select: "title"}).populate({path:"user", select:"id, name"})
    res.status(200).json({
        status: "Success",
        data: ticketList
    })

})


exports.buyTickets = catchAsync (async(req,res,next)=>{ 
    const user = req.user  
    let ticketsToBuyNo = req.body.ticketsToBuyNo
    console.log(req.body)
    const id = req.params.eid
    const eventFind = await Event.findById(id)                                                                                                   
    const availableTicket = eventFind.availableTicket
    if (availableTicket < ticketsToBuyNo){
        return next(new AppError, 401, "Not Enough Tickets") 
    } 
    let a = []
    for (i=0; i < ticketsToBuyNo ; i++){
        const ticketsToSellNo = await Ticket.create({
            event: id,
            user: user._id
        })
        a.push(ticketsToSellNo)
    }
    eventFind.availableTicket = availableTicket - a.length
    await eventFind.save()
    console.log(eventFind.availableTicket)
    res.status(200).json({
        status: "Success",
        data: a
    })
    console.log(a)
})

