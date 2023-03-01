

const User = require('../models/User')


const adminUser = async (req , res , next ) => {
    
    const email = req.body.email
    
    console.log("email", email)
    const admin = await User.findOne({email })
    console.log("Admin check",admin)
    console.log (admin.isAdmin)
    req.isAdmin = admin.isAdmin
if ( admin.isAdmin === true ){

     console.log('You are admin')
     
}
else {
     
     console.log("You dont have the accessbility.")
    }

    next()
}

// const  userId = '63bbc254179d7918d4e96ead' ;
// const adminUser = (req , _ , next ) => {
   
//     req.user = {
//         id : userId
//     }


// }

module.exports = adminUser ;