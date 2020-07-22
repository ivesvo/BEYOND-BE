const Event = require('../models/event')
const { catchAsync } = require('./errorController')
const AppError = require('../utils/appError')
const City = require('../models/city')
const PAGE_SIZE = 6

exports.getEventList = catchAsync(async (req, res, next) => { 
    const { city } = req.query
    let q
    if(city){
        q = Event.find({ city: city
            // price:{$gte: minPrice, $lte:maxPrice}
        })
    } else {
        q= Event.find()
    }

        
    const pageNum = req.query.page || 1
    const numToSkip = (parseInt(pageNum)-1)*PAGE_SIZE
    const eventList = await q.sort({ createdAt: -1 }).populate({ path: "city", select: "city, code"})
    .limit(PAGE_SIZE).skip(numToSkip);
    const numDocuments = await Event.countDocuments();
    console.log(eventList.length)
    res.status(200).json({
        status: "Success",
        data: eventList,
        maxPageNum: Math.ceil(numDocuments/PAGE_SIZE)
    })
})

exports.createEvent = catchAsync(async (req, res, next) => {
    
    const user = req.user
    if (user.role != "admin") {
        return next(new AppError(401, "You cannot"))
    }
    console.log("wendfsfed")
    const { title, description, date, startTime, endTime, venue, address, lineup, minimumAge, posterURL, price, availableTicket, city } = req.body
    if (!title || !description || !date) {
        return next(new AppError(401, "please provide all the data required to create an experience"))

    };
    //EATING,playiung ==> ["eating","playing"]

    // let myTags= tags.split(",")
    // let newArr = await Tag.convertToObject(myTags)

    //tag rightnow is an array of string
    // --> convert to an arrat of objectIDs
    // ig tag exists in tags collcction, then we will use the associate id as objecID
    // else, we need to create that tag document in the collection first, then return the id
    console.log("YE")
    const cityObj = await City.findOne({code:city})
    const event = await Event.create(
        {
            title: title,
            description: description,
            date: date,
            startTime: startTime,
            endTime: endTime,
            venue: venue,
            address: address,
            lineup: lineup,
            minimumAge: minimumAge,
            price: price,
            posterURL: posterURL,
            availableTicket:availableTicket,
            city: cityObj
        })
        console.log("YO")
    // await exp.populate({path:"host", select:"name"}).execPopulate()
    res.status(201).json({ status: "OK", data: event })


})

exports.updateEvent = async (req, res, next) => {
    try {
        const user = req.user
        const { title, description, date, startTime, endTime, venue, address, lineup, minimumAge, posterURL, price, availableTicket, city } = req.body
        const cityObj = await City.findOne({code:city}).populate({ path: "city", select: "city"})
        const updatedevent = await Event.findByIdAndUpdate(req.params.eid, {
            title: title,
            description: description,
            date: date,
            startTime: startTime,
            endTime: endTime,
            venue: venue,
            address: address,
            lineup:lineup,
            minimumAge: minimumAge,
            posterURL: posterURL,
            price: price,
            availableTicket: availableTicket,
            city: cityObj
        },{new:true})
        if (!updatedevent) {
            return next(new AppError(400, "Undefined Event"))
        }
        if (user.role != "admin") {
            return next(new AppError(401, "You cannot"))
        }
        res.status(200).json({
            status: "Successfully Editing Your Event",
            data: updatedevent
            
        })
        console.log("HAHAHAHA", updatedevent)
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })
    }
}


exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.eid)
        res.status(200).json({
            status: "Successfully Deleting Your Event",
            data: event
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })
    }
}


exports.getEventById = catchAsync(async (req, res, next) => {
    const id = req.params.eid
    console.log(id)
    console.log(id.length)
    const event = await Event.findOne({_id:id}).populate({ path: "city", select: "city, code"})
    console.log(event)
    if (!event) {
        throw new AppError(500, "No Data")
    }
    res.status(200).json({
        status: "Sucess",
        data: event
    })
})

exports.getEventbyCity = catchAsync(async (req, res, next) => {
    const code = req.params.code 
    const cityToFind = await City.findOne({code:code})
    const event = await Event.find({city:cityToFind}).populate({ path: "city", select: "city, code"})
    console.log(event)
    if (!event) {
        throw new AppError(500, "No Data")
    }
    res.status(200).json({
        status: "Success",
        data: event
    })
})


// exports.getEventByTitle = catchAsync(async (req, res, next) => {
//     const title = req.params.title
//     const event = await Event.findOne({title: title })
//     if (!artist) {
//         throw new AppError(500, "No Data")
//     }
//     res.status(200).json({
//         status: "Sucess",
//         data: event
//     })
// })
// exports.getExperienceId = async (req, res) => {
//     const id = req.params.eid
//     const exp = await Exp.findById(id)
//     console.log(exp)
//     res.status(200).json({
//         status: "Successful",
//         data: exp
//     })
// }

// exports.findExpsbyTags = async (req, res) => {
//     // console.log("AGFJDKFKKF")
//     const id = req.params.tid
//     const exp = await Exp.find({ tags: { $in: id } })

//     res.status(200).json({
//         status: "Successful",
//         data: exp
//     })
// }

// exports.getOldExps = async (req, res) => {
//     console.log("ditme")
//     const id = req.params.id;
//     const oldExps = await Exp.findById(id);
//     console.log("old", oldExps);
//     res.status(200).json({
//         data: oldExps,
//         status: "success",
//     });
// };