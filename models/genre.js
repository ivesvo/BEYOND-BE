const mongoose = require ('mongoose')


const genreSchema = new mongoose.Schema({
    genre:{
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
    },
    code:{
        type: String,
        trim: true,
        // required : true
    },
    description:{
        type: String,
    }
})
genreSchema.statics.convertToObject = async function (arr){
    console.log(arr)
    let a = arr.map(async e => {
        let genre = await Genre.findOne({genre:e.toLowerCase().trim(),code:e.toLowerCase()})
        if(genre)
        return genre
        return await this.create({genre: e.toLowerCase().trim(), code:e.toLowerCase().trim()})

})
    let result = Promise.all(a)
    return result
}


const Genre = mongoose.model("Genre", genreSchema)

module.exports = Genre;