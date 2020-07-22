const mongoose = require('mongoose')


const ticketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"

    },
})


const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket;