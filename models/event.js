const mongoose = require ('mongoose');


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        minLength: 5,
        maxLength: 140,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
        maxLength: 1000,
        minLength: 130,
    },
    date:{
        type: Date,
        default: Date.now
    },
    startTime:{
        type: String
    },
    endTime:{
        type: String
    },
    venue:{
        type: String,
    },
    address:{
        type: String
    },
    lineup:[{
        type: String,
    }],
    minimumAge:{
        type: String,
    },
    posterURL:{
        type: String,
        required: [true, "poster is requied"]
    },  
    availableTicket:{
        type: Number,
        min: [1, "Available ticket must be equal or greater than 1"]
    },
    price: {
        type: Number,
        required: [true, "event ticket must have a price"],
        min: [5, "event ticket price must be at least 5 dollar"]
    },
    city: {
        type: mongoose.Schema.ObjectId,
        ref: "City",  
    }},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// eventSchema.methods.toJSON = function () { 
//     delete obj.__v;
//     return obj
// }

const Event = mongoose.model("Event", eventSchema)
module.exports = Event;