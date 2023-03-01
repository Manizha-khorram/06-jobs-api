const ArtCollectible = require("../models/ArtCollectible")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")


const getAllArtCollectibles = async (req, res) => {
    const ArtCollectibles = await ArtCollectible.find({ artist : req.user.userId}).sort('createdAt') //we only get the ArtCollectibles which associated with this user!
    res.status(StatusCodes.OK).json({ ArtCollectibles , count : ArtCollectibles.length })
}

const getArtCollectible = async (req, res) => {
    res.send('get ArtCollectible')
}

const creatArtCollectible= async (req, res) => {
    req.body.artist = req.user.userId  //2. push the userId to the artist Id
    const artCollectible = await ArtCollectible.create(req.body)  // 1.creating the artCollectible and push it into req.body
    res.status(StatusCodes.CREATED).json({artCollectible}) //parse it
}

const updateArtCollectible = async (req, res) => {
    res.send('Update ArtCollectible')
}

const deleteArtCollectible = async (req, res) => {
    res.send('login user')
}

module.exports = {

    getAllArtCollectibles,
    getArtCollectible,
    creatArtCollectible,
    updateArtCollectible,
    deleteArtCollectible,
}