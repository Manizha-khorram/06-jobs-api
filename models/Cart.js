
const { number } = require('joi');
const mongoose = require('mongoose');

const CartSchema = mongoose.Schema(
    {
      userID: {
        type: Number,
        required: true,
      },
     products:[
       {
        productId :{
            type: String,
          },
        quantity: {
          type: Number, 
          default :1,
        }    
     },
    ],
   },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Order', OrderSchema);