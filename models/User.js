const mongoose = require('mongoose')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const UserSchema = new mongoose.Schema ({

    name : {
      type :String ,
      required : [true , 'Please provide name'],
      minlegnth :3,
      maxlength : 50,
    },
    email: { type :String ,
    required : [true , 'Please provide email'],
    match :[
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please Provide valid email',
    ],
    unique : true ,
    },
    password : {
        type :String ,
        required : [true , 'Pleas provide password'],
        minlegnth :6,
        //maxlength : 12,
      },

})

UserSchema.pre('save', async function(){
  
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password , salt)  //this pointing to our document (UserSchema)
   //why did he delete the next() ? we were suppos to pass it to next middleware? why it is working??
}) 

UserSchema.methods.createJWT = function () {
  return jwt.sign({userId : this._id , name: this.name} , process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME ,
 
  })
}
 UserSchema.methods.comparePassword = async function ( canditatePassword){ // 6.for next login step we need to compare the password.!
 const isMatch = await bcrypt.compare(canditatePassword , this.password)  //candidatePassword : the password which came by the request & the this.password : stored in our database
 return isMatch
}

// UserSchema.methods.getName = function (){
//   return this.name   // we should use function keyword not the arrow function otherwise this always means the document!!!!
// }
module.exports = mongoose.model('User' , UserSchema)