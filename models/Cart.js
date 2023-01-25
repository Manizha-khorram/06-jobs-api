

const mongoose = require('mongoose');

const CartSchema = mongoose.Schema(
    {
      owner : {
        type: mongoose.Types.ObjectId,
         required: true,
         ref: 'User'
       },
       artCollectibles: [{
        artCollectibleId: {
         type: mongoose.Types.ObjectId,
         ref: 'ArtCollectible',
         required: true
      },
      title : String,
      quantity: {
         type: Number,
         required: true,
         min: 1,
         default: 1},
         price: String
       }],
      
      }, {
      timestamps: true
      })
  
  module.exports = mongoose.model('Cart', CartSchema);