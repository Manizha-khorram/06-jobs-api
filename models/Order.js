
const { number } = require('joi');
const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
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
    amount :{
      type : Number ,
      require : true,
    },
    address :{
      type : String ,
      required : true,  
    },
    status :{
      type : String,
      default : "pending"
    } 
   },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Order', OrderSchema);