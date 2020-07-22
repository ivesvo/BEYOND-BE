const City = require('../models/city')
// const Event = require('../models/event')
const {catchAsync} = require('./errorController')


exports.getCityList =  catchAsync (async (req,res,next)=>{ 
    const cityList = await City.find({}).sort({genre:1})
    res.status(200).json({
        status: "Success",
        data: cityList
    })

})

exports.createCity = catchAsync (async (req,res,next)=>{
    const {city, code} = req.body
    const newcity = await City.create({
        city: city,
        code: code
    })
    res.status(201).json({
        status: "Success",
        data: newcity
    })
})
