const AppError = require('../utils/appError')

exports.notFound = (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        messagge: 'URL NOT FOUND'
    })

}

exports.catchAsync = (func) => {
    // console.log("hello this is error")
    return (req, res, next) => func(req, res, next).catch(next)
}

exports.errorHandler = (err, req, res, next) => {
    // default err object of undefined
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    console.log(err)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }