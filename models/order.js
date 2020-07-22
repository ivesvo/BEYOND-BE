const mongoose = require ('mongoose')


const orderSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",  
       
    },
    items:[Object],
    status:{
        type: String,
        enum: ['pending', 'paid']
    },
    cart:{
        type: mongoose.Schema.ObjectId,
        ref:"Cart"
    }
    },{
        timestmaps: true,
        toJSON: { virtuals: true },
        toObject: { virtual: true }
    })
const Order = mongoose.model("Order", orderSchema)

module.exports = Order;