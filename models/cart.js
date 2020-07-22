const mongoose = require ('mongoose')


const cartSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",  
       
    },
    items:[Object],
    status:{
        type: String,
        enum: ['cancelled', 'pending', 'complete']
    }
    },{
        timestmaps: true,
        toJSON: { virtuals: true },
        toObject: { virtual: true }
    })
const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;