//const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { object } = require('joi')
const errorHandlerMiddleware = (err, req, res, next) => {
  //if our error is the custom one if not we need custom error response

  let customError = {
    //set default
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.message || "Something went wrong try again later."
  }
  
 console.log(err)
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name === 'ValidationError'){
    console.log(Object.values(err.error))
    customError.msg = Object.values(err.errors)
    .map((item) => item.messsage)
    .join(',')
    customError.statusCode = 400
  }
  if ( err.code && err.code === 11000){ //11000 => duplicate issue at database
      customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field , please enter another value.` //err.keyValue = email
      customError.statusCode = 400;
      }    
  if (err.name === 'CastError')  {
     customError.msg = `No item with id : ${err.value}`
     customError.statusCode = 404
  } 
      
      
      //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg})
}

module.exports = errorHandlerMiddleware
