const User = require ('../models/User')
const ArtCollectible = require("../models/ArtCollectible")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")
const Cart = require("../models/Cart")

//get cart

const getCart = async (req, res) =>{

    const owner = req.user.userId;
    console.log(owner)
    const cart = await Cart.findOne({ owner });
      if (cart && cart.artCollectibles.length > 0) {
        res.status(200).json({cart , length: cart.artCollectibles.length});
      } else {
        res.status(200).json({msg :'No Cart'})
      }
   
};

//create cart

const createCart = async (req , res ) =>{
    console.log("userrrr",req.user)
    const role = req.user.role
    console.log("my role",role)
    const owner = req.user.userId;
    //const {userId } = req.user
    const { artCollectibleId, quantity } = req.body;
    
    //we check if the cart or product already exist!
    const cart = await Cart.findOne({ owner })
    console.log(cart)
    const artCollectible = await ArtCollectible.findById(
       artCollectibleId
     )
   //console.log(" here it is :", artCollectible)
   
   const artist = artCollectible.artist
   const title = artCollectible.title;
   const price = artCollectible.price
   const freeShipping = artCollectible.freeShipping
   //console.log("freeShipping",freeShipping)
    //if cart exist
    if (cart){
        
        const artCollectibleIndex = cart.artCollectibles.findIndex((artCollectible) => artCollectible.artCollectibleId ==  artCollectibleId);
    
    //if artCollectible exist

    if(artCollectibleIndex > -1){
     
        let product = cart.artCollectibles[artCollectibleIndex];
        product.quantity += quantity;
        cart.artCollectibles[artCollectibleIndex] = product ;
        //await cart.save();
        //res.status(200).json({cart})
    } else {
        //here we push the artCollectible to cart
        cart.artCollectibles.push({artCollectibleId, quantity , title , price , artist, freeShipping})
        console.log(" our cart here :",cart.artCollectibles)
    }
    if (role !== "user"){
        throw new NotFoundError(`You should be customer`)
    }
    await cart.save();
    res.status(StatusCodes.OK).json({cart})
}else{
   
    const newCart = await Cart.create({
        artCollectibles : [{artCollectibleId, quantity }],
        price,
        artist,
        freeShipping
        
    })

    if (role !== "user"){
        throw new NotFoundError(`You should be customer`)
    }

    res.status(StatusCodes.OK).json(newCart)  

}

}

//delete Cart

const deleteCart = async (req , res) =>{

    const owner = req.user.userId;
    const { params: {id:artCollectibleId}}= req

    let cart = await Cart.findOne({owner})
    
    const artCollectibleIndex = cart.artCollectibles.findIndex((artCollectible) => artCollectible.artCollectibleId == artCollectibleId)
   
    if(artCollectibleIndex>-1){

        let artCollectible = cart.artCollectibles[artCollectibleIndex]
        cart.artCollectibles.splice(artCollectibleIndex , 1 )
        cart = await cart.save();
        res.status(StatusCodes.OK).json({cart})
    }
    else {
        throw new NotFoundError(`No artCollectible with this Id.`)
    }


} 


module.exports = {getCart , createCart , deleteCart}