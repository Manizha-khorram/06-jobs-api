const User = require ('../models/User')
const ArtCollectible = require("../models/ArtCollectible")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")

const getAllArtCollectibles = async (req , res) =>{
    
    
    const ArtCollectibles = await ArtCollectible.find({})
    //console.log('find it',artCollectibles)
    if( !ArtCollectibles ){
      throw new NotFoundError(`No ArtCollectible available`)
    }
    res.status(StatusCodes.OK).json({ ArtCollectibles , count : ArtCollectibles.length })
  }

  module.exports = {getAllArtCollectibles}