
const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
      userID: {
        type: Number,
        //required: true,
      },
     artCollectibles:[
       {
        artCollectibleId :{
            type: String,
          },
        quantity: {
          type: Number, 
          default :1,
        },  
        freeShipping: {
          type: Boolean,
          default: false,
        },
     },
    ],
    amount :[{
      totalAmount :{
        type : Number ,
        require : true,
      },
      shopDiscount:{
        type : Number ,
        require : true,
      },
      subtotal:{
        type : Number ,
        require : true,
      }
    },
    ],
    address :{
      type : String ,
      //required : true,  
    },
    status :{
      type : String,
      default : "pending"
    } 
   },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Order', OrderSchema);