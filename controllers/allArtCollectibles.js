const User = require ('../models/User')
const ArtCollectible = require("../models/ArtCollectible")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")
const { json } = require('express')

const getAllArtCollectibles = async (req , res) =>{
    
    
    const artCollectibles = await ArtCollectible.find({})
    //console.log('find it',artCollectibles)
    if( !artCollectibles ){
      throw new NotFoundError(`No ArtCollectible available`)
    }
    const artMapped = artCollectibles.map((x) => {
     var y = JSON.parse(JSON.stringify(x))  //deep copy
     //console.log('at line 17', y)//
     if (y.image && y.image.buffer){
    //  console.log('image URL before delete', y)
     delete y.image;
    // console.log('image URL after delete', y)
     y.imageURL = `/api/v1/allArts/image/${x.id}`
    
     }
     return y;
     
    })
    res.status(StatusCodes.OK).json({ ArtCollectibles: artMapped , count : artMapped.length })
  }

  const getImage = async (req , res ) =>{

    const artCollectible = await ArtCollectible.findById(req.params.id)
    //console.log(artCollectible)
    res.set("Content-Type" , artCollectible.image.contentType) //header
    res.status(StatusCodes.OK).send(artCollectible.image.buffer)
}

const getSwagger = async (req , res) => {

  res.send('<a href="/api-docs">Documentation</a>')
}

  module.exports = {getAllArtCollectibles , getImage, getSwagger}