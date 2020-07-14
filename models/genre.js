const mongoose = require ('mongoose')


const genreSchema = new mongoose.Schema({
    genre:{
        type: String,
        // required: [true, "genre is required"],
        unique: true,
        trim: true,

    }
})


const Genre = mongoose.model("Genre", genreSchema)

module.exports = Genre;