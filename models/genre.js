const mongoose = require ('mongoose')


const genreSchema = new mongoose.Schema({
    genre:{
        type: String,
        lowercase: true,
        // required: [true, "genre is required"],
        unique: true,
        trim: true,

    },
    description:{
        type: String,
    }
})


genreSchema.statics.convertToObject = async function (arr){

    console.log(arr)
    // let arr = [...this.tag] // array of strings
    //change arr to arr of objectid
    //find the tag from each string from Tag model
    let a = arr.map(async e => {
        let genre = await Genre.findOne({genre:e.toLowerCase().trim()})
        if(genre)
        return genre
        return await this.create({genre: e.toLowerCase().trim()})

})
    
    let result = Promise.all(a)
    // console.log(result)
    return result
}


const Genre = mongoose.model("Genre", genreSchema)

module.exports = Genre;