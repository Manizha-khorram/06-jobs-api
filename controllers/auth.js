const User = require ('../models/User')
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req , res)=>{

//if we want we can chech the validation and have our custom error here to prevent that messy error which user cannt understand it.
        //    if(!name || !email || !password){
        //       throw new BadRequestError('please provide email , name , password')
        //    }

//since in next steps we wrote these hashing password code in our user-model we dont need it here anymore.
        //     const {name , email , password } = req.body
        //    const salt = await bcrypt.genSalt(10)  //random bites 
        //    const hashedPassword = await bcrypt.hash(password , salt)

        //    const tempUser = {name , email , password : hashedPassword}
    
   
   const user = await User.create({...req.body})  //modelname.create   //because we want the mongoose to do all the validations so we put the req.body into creat method. then tempUser for just one user.
   const token = user.createJWT()
   res.status(StatusCodes.CREATED).json({ user :{name : user.name } , token})

}

const login = async (req, res) => {
   const {email , password } = req.body //1.first in the reqest we are looking for email and password 
   if (!email || !password) {   //2.check if it is not provided throw an error
    throw new BadRequestError('Please provide email and password')
   }
const user = await User.findOne({email}) //3.check if we have the user in our database!

if(!user){   //4.if the user didnt exist throw error
    throw new UnauthenticatedError('Invalid Credentials')
}
//compare password
const isPasswordCorrect = await user.comparePassword(password) //7.compare the password for the login
if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
}
const token = user.createJWT()              //5.if the user exist we send back the token and name!
res.status(StatusCodes.OK).json({user : { name : user.name , role : user.role} , token})
}
module.exports = {
    register,
    login,
}