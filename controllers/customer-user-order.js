const User = require ('../models/User')
const ArtCollectible = require("../models/ArtCollectible")
const {StatusCodes} = require ('http-status-codes')
const {BadRequestError , NotFoundError} = require('../errors')
const { JsonWebTokenError } = require("jsonwebtoken")
const Cart = require("../models/Cart")
const Order = require("../models/Order")



//Create order
const createOrder = async (req , res ) =>{

    const {role} = req.user
    const owner = req.user.userId
   // const address = req.body.address
    const artCollectibles = Cart.artCollectibles
  
    const cart = await Cart.findOne({ owner})

    const cartArtc = cart.artCollectibles ;
    

     //change the string to number 
    const Nprice = cartArtc.map((product) => { return parseFloat(product.price) * (product.quantity)
    
    
    })

    //const quantity = cartArtc.quantity
    //const price = cartArtc.price

    //sum of all price values:
    const totalAmount = Nprice.reduce(function(total , arr) {
    
        
        return total + arr   
    }, 0)
    

    const shopDiscount = totalAmount * 10 /100;
    const cost =  totalAmount - shopDiscount;
    
    const amount = [{totalAmount , shopDiscount , cost}]
    
    if(!cart){
        throw new NotFoundError(`Cart doesn't exist.`)
       
    }
//
    else {
         
        const order = await Order.create({
            
            artCollectibles: cart.artCollectibles,
            amount
        })
            
            res.status(StatusCodes.CREATED).json(order)
    }





}





//delete order




module.exports = {createOrder}