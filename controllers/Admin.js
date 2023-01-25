const User = require ('../models/User')
const ArtCollectible = require("../models/ArtCollectible")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")

const getAllArtCollectibles = async (req , res) =>{
    
  
    const {role} = req.user
    const artCollectibles = await ArtCollectible.find()
    
    if(role !== "admin"){
      throw new NotFoundError(`You dont have the ability to access all artCollectibles`)
    }
    res.status(StatusCodes.OK).json({ artCollectibles , count : artCollectibles.length })
    
    }

  const getAllUsers = async (req, res) => {

    const {role} = req.user
    
    const users = await User.find();
    
    if(role !== "admin" ){
      throw new NotFoundError(`You dont have the ability to access to all user's information.`)
    }
   
    res.status(StatusCodes.OK).json({ users })

  }



  const deleteUser = async (req , res ) =>{

    const {role} = req.user
    const { params : { id : userId} } = req; 
    
    const user = await User.findByIdAndRemove({ _id : userId})
   
    if(role !== "admin" ){
      throw new NotFoundError(`You dont have the ability to access to delete`)
    }
    if (!user){
      throw new NotFoundError(` No user with this name ${user.userId}`)
    }
    res.status(StatusCodes.OK).json({ mes :`${user.name} has been deleted.` })
    
    }



    //view all orders


    // const createCart = async (req , res ) => {
     

    // }


  



    module.exports = {getAllUsers , deleteUser , getAllArtCollectibles} ;

   