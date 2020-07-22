const mongoose = require('mongoose')


const citySchema = new mongoose.Schema({
    city: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
    },
    code: {
        type: String,
        trim: true,
        required: true
    },
})

citySchema.statics.convertToObject = async function (arr) {
    console.log(arr)
    let a = arr.map(async e => {
        let city = await City.findOne({city: e.toLowerCase().trim(), code: e.toLowerCase().trim()})
        if (city)
            return city
        return await this.create({city: e.toLowerCase().trim(), code: e.toLowerCase().trim() })
    })
    let result = Promise.all(a)
    console.log(result)
    return result
}



const City = mongoose.model("City", citySchema)

module.exports = City;