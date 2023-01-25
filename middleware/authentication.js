const User = require ('../models/User')
const jwt = require ('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')


const auth = (req , res , next)=> {
    //check header
    //console.log("Headers equal :",req.headers)
    const authHeader = req.headers.authorization
    if ( !authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Inavalid')
    }
    const token = authHeader.split(' ')[1]  // turn it to array
    
    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        //attach the user to the ArtCollectible routes
        req.user = {userId : payload.userId , name: payload.name , role : payload.role} //we send this info to the user
        console.log(req.user.role)
        //   const user = User.findById(payload.id).select('-password')   //select('-password') : remove password
    //   req.user = user
        next();
    }
    catch(error){
        throw new UnauthenticatedError('Authentication Inavalid')
    }

}

module.exports = auth