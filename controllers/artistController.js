const Artist = require('../models/artist')
const { catchAsync } = require('./errorController')
const Genre = require('../models/genre')
const AppError = require('../utils/appError')


exports.getArtistList = catchAsync(async (req, res, next) => {
    const artistList = await Artist.find({}).sort({ title: 1 })
    res.status(200).json({
        status: "Success",
        data: artistList
    })

})


exports.createArtist = catchAsync(async (req, res, next) => {
    const { title, biography, pictureURL, city, genres } = req.body
    if (!title || !genres || !biography) {
        next(new AppError, 401, "Please provide all the data required to create an artist")
    }
    // let myGenres= genres.split(",")
    let newArr = await Genre.convertToObject(genres)
    const newartist = await Artist.create({
        title: title,
        biography: biography,
        genres: newArr,
        pictureURL: pictureURL,
        city: city
    })
    // await newartist.populate({path:"genre", select:"genre"}).execPopulate()
    res.status(201).json({
        status: "Success",
        data: newartist
    })
})

// exports.updateArtist = catchAsync (async (req,res,next)=>{
//     const {genre} = req.body
//     const editartist = await Artist.findByIdAndUpdate(req.params.aid, {
//         genre: genre
//      })
//      res.status(200).json({
//          status: "Successfully Editing Your Genre",
//          data: editgenre
// })
// })


exports.deleteArtist = catchAsync(async (req, res, next) => {
    const artist = await Artist.findByIdAndDelete(req.params.aid)
    res.status(200).json({
        status: "Successfully Deleting Your Genre",
        data: artist
    })

})

exports.getArtistByTitle = catchAsync(async(req,res,next)=>{
    console.log("helolo")
    const title = req.params.title
    const artist = await Artist.findOne({title:title})
    if (!artist){
        throw new AppError(500, "No Data")}
    res.status(200).json({
        status: "Sucess",
        data: artist
    })
})