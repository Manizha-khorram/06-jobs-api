const ArtCollectible = require("../models/ArtCollectible")
const User = require("../models/User")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")
const multer = require('multer')


const getAllArtCollectibles = async (req, res) => {
   
   
    const artCollectibles = await ArtCollectible.find({ createdBy : req.user.userId}).sort('createdAt') //we only get the ArtCollectibles which associated with this user!
      
   // console.log(artCollectibles)  

    const artMapped = artCollectibles.map((x) => {
        var y = JSON.parse(JSON.stringify(x))  //deep copy
       
        if (y.image && y.image.buffer){
        
        delete y.image;
       
        y.imageURL = `/api/v1/ArtCollectibles/image/${x.id}`
       
        }
        return y;
        
       })
       res.status(StatusCodes.OK).json({ ArtCollectibles: artMapped , count : artMapped.length }) 

}

const getArtCollectible = async (req, res) => {
    const {
        user:{userId} ,
        params:{id:artCollectibleId}
    } = req

    const artCollectible = await ArtCollectible.findOne({
       _id:artCollectibleId , createdBy : userId
    })
    if(!artCollectible){
        throw new NotFoundError(`No artCollectible available with this id ${artCollectibleId}`)
    }
    var y = JSON.parse(JSON.stringify(artCollectible))
    y.imageURL = `/api/v1/ArtCollectibles/image/${artCollectibleId}`
    //console.log('URL',artCollectible.imageURL)
    res.status(StatusCodes.OK).json(y)
   // console.log('got here', artCollectible)
}

const creatArtCollectible= async (req, res) => {
    const {role} = req.user
    if(role !== "artist"){
        throw new BadRequestError(' Make sure you are an artist!!')
    }
    req.body.createdBy = req.user.userId  //2. push the userId to the createdBy Id
    req.body.artist = req.user.name ;
    
  if(req.file){
    req.body.image = {buffer: req.file.buffer , contentType: req.file.mimetype}
  }
  console.log("Here is the req.file",req.file)
  //console.log("Here is req.body", req.body)
    const artCollectible = await ArtCollectible.create(req.body)  // 1.creating the artCollectible and push it into req.body
    res.status(StatusCodes.CREATED).json({artCollectible}) //parse it
    }

const updateArtCollectible = async (req, res) => {
    const {role} = req.user
    if(role !== "artist"){
        throw new BadRequestError(' Make sure you are an artist!!')
    }
   
    const {
        //body :{title , price},
        user:{userId} ,
        params:{id:artCollectibleId}
    } = req


    if(req.file){
        req.body.image = {buffer: req.file.buffer , contentType: req.file.mimetype}
      }
      console.log(req.file)
    // if(title === '' || price === ''){
    //     throw new BadRequestError(' Title or price cannot be empty!')
    // }
   
    //findByIdAndUpdate(id, update, options, callback) // executes
    const artCollectible = await ArtCollectible.findByIdAndUpdate(
        {_id : artCollectibleId , createdBy : userId },
        req.body , //the part which gonna be upadated
        {new : true , runValidators:true}
         )
         if(!artCollectibleId){
            throw new NotFoundError(`No artCollectible available with this id ${artCollectibleId}`)
        }

      
        
        res.status(StatusCodes.OK).json({artCollectible})
    }


const deleteArtCollectible = async (req, res) => {
    const {role} = req.user
    if(role !== "artist"){
        throw new BadRequestError(' Make sure you are an artist!!')
    }
      const {
        user : {userId},  //located in the request which come from auth middleware.
        params: {id:artCollectibleId} // comming from params
      }= req

      const artCollectible = await ArtCollectible.findByIdAndRemove({
        _id : artCollectibleId,
        createdBy : userId
      })
      if(!artCollectibleId){
        throw new NotFoundError(`No artCollectible available with this id ${artCollectibleId}`)
    }
    res.status(StatusCodes.OK).json({artCollectible})

}

const getImage = async (req , res ) =>{

    const artCollectible = await ArtCollectible.findById(req.params.id)
    //console.log(artCollectible)
    res.set("Content-Type" , artCollectible.image.contentType) //header
    res.status(StatusCodes.OK).send(artCollectible.image.buffer)
}

module.exports = {

    getAllArtCollectibles,
    getArtCollectible,
    creatArtCollectible,
    updateArtCollectible,
    deleteArtCollectible,
    getImage,
}