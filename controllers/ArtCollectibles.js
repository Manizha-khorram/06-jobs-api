const ArtCollectible = require("../models/ArtCollectible")
const User = require("../models/User")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")


const getAllArtCollectibles = async (req, res) => {
   
   
    const ArtCollectibles = await ArtCollectible.find({ createdBy : req.user.userId}).sort('createdAt') //we only get the ArtCollectibles which associated with this user!
    res.status(StatusCodes.OK).json({ ArtCollectibles , count : ArtCollectibles.length })    
    console.log(ArtCollectibles)  

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
    res.status(StatusCodes.OK).json({artCollectible})
}

const creatArtCollectible= async (req, res) => {
    req.body.createdBy = req.user.userId  //2. push the userId to the createdBy Id
    req.body.artist = req.user.name ;
    const artCollectible = await ArtCollectible.create(req.body)  // 1.creating the artCollectible and push it into req.body
    res.status(StatusCodes.CREATED).json({artCollectible}) //parse it
}

const updateArtCollectible = async (req, res) => {
    const {
        body :{title , price},
        user:{userId} ,
        params:{id:artCollectibleId}
    } = req

    if(title === '' || price === ''){
        throw new BadRequestError(' Title or price cannot be empty!')
    }

    //A.findByIdAndUpdate(id, update, options, callback) // executes
    const artCollectible = await ArtCollectible.findByIdAndUpdate(
        {_id : artCollectibleId , createdBy : userId },
        req.body , //the part which should gonna be upadated
        {new : true , runValidators:true}
         )
         if(!artCollectibleId){
            throw new NotFoundError(`No artCollectible available with this id ${artCollectibleId}`)
        }
        res.status(StatusCodes.OK).json({artCollectible})
}

const deleteArtCollectible = async (req, res) => {
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

module.exports = {

    getAllArtCollectibles,
    getArtCollectible,
    creatArtCollectible,
    updateArtCollectible,
    deleteArtCollectible,
}