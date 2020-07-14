const Genre = require('../models/genre')
const {catchAsync} = require('./errorController')


exports.getGenreList =  catchAsync (async (req,res,next)=>{ 
    const genreList = await Genre.find({}).sort({genre:1})
    res.status(200).json({
        status: "Success",
        data: genreList
    })

})

exports.createGenre = catchAsync (async (req,res,next)=>{
    const {genre} = req.body
    const newgenre = await Genre.create({
        genre: genre
    })
    res.status(201).json({
        status: "Success",
        data: newgenre
    })
})

exports.updateGenre = catchAsync (async (req,res,next)=>{
    const {genre} = req.body
    const editgenre = await Genre.findByIdAndUpdate(req.params.gid, {
        genre: genre
     })
     res.status(200).json({
         status: "Successfully Editing Your Genre",
         data: editgenre
})
})


exports.deleteGenre = catchAsync (async (req,res,next)=>{
    const genre = await Genre.findByIdAndDelete(req.params.gid)
    res.status(200).json({
        status: "Successfully Deleting Your Genre",
        data: genre
    })

})