const Cart = require('../models/city')
const Event = require('../models/event')
const { catchAsync } = require('./errorController')
const User = require('../models/user')
const AppError = require('../utils/appError')



exports.getCartList = catchAsync(async (req, res, next) => {
    const user = req.user
    const cart = await user.generatePendingCart()
    res.status(200).json({
        status: "Success",
        data: cart
    })

})


// exports.addToCart = catchAsync(async (req, res, next) => {
//     const item = req.body.item
//     const quantity = req.body.quantity * 1 || 1
//     const user = req.user
//     const cart = await user.generatePendingCart()
//     const doc = await Event.findById(item)
//     if (!doc) {
//         return next(new AppError(404, "ITEM NOT FOUND"))
//     }
//     if (doc.availableTicket < quantity) {
//         return next(new AppError, 401, "Not Enough Tickets")
//     }

//     for (let i = 1; i <= quantity; i++) {
//         cart.items.push(doc)
//     }

//     await cart.save()
//     doc.availableTicket = doc.availableTicket - quantity
//     await doc.save()

//     res.status(200).json({
//         status: "Success",
//         data: cart
//     })
// })

exports.addToCart = catchAsync(async (req, res, next) => {
    const item = req.body.item
    const quantity = req.body.quantity * 1 || 1
    const user = req.user
    const cart = await user.generatePendingCart()
    const doc = await Event.findById(item)
    if (!doc) {
        return next(new AppError(404, "ITEM NOT FOUND"))
    }
    if (doc.availableTicket < quantity) {
        return next(new AppError, 401, "Not Enough Tickets")
    }
    cart.items = cart.items.filter(e => e._id.toString() !== item)
    for (let i = 1; i <= quantity; i++) {
        cart.items.push(doc)
    }

    await cart.save()
    doc.availableTicket = doc.availableTicket - quantity
    await doc.save()

    res.status(200).json({
        status: "Success",
        data: cart
    })
})


