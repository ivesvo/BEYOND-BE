const mongoose = require('mongoose');



const artistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "name is required"],
        unique: true,
        trim: true,
    },
    genres: [
        {
        type: mongoose.Schema.ObjectId,
        ref: "Genre",
        required: [true, "genre is required"],
    }
],
    biography: {
        type: String,
        required: true,
        trim: true,
    },
    pictureURL: {
        type: String,
    },
    city: {
        type: String
    },
    soundcloudURL: {
        type: String
    },
    bandcampURL: {
        type: String
    },
    instagramURL: {
        type: String
    },
    facebookURL: {
        type: String
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

artistSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.id
    return obj
}


const Artist = mongoose.model("Artist", artistSchema)


module.exports = Artist;