
const mongoose = require ('mongoose')

const ArtCollectibleSchema = new mongoose.Schema({
    
    //options which should be considered when creating a ArtCollectible
    paintingType :{
        type : String ,
        required : [ true , 'Please provide painting type'],
        enum : ['Oil' , 'WaterColor' , 'Acrylic' , 'Ink' , 'Mixed' ,'Gouache','Combination'],
        maxlength : 50 
    },

    createdBy : {
     type : mongoose.Types.ObjectId,
     ref: 'User',
     required : [true],
  
    },
    artist: {    // I want to reference the userName at User model to this one!
      type : String ,
     // required : [false , 'Please provide title for your art']
     } ,
    title : {
      type : String ,
      required : [true , 'Please provide title for your art']
     } ,
    price : {
     type : String ,
     required : [true , 'Please provide price for your art']

    } ,
    image: {
        type: String,
        default: '/uploads/example.jpeg',  // I want the user to uploud the image!
      },
    description: {
        type: String,
        required: true
      },
      freeShipping: {
        type: Boolean,
        default: false,
      },
      inventory: {
        type: Number,
        required: true,
        default: 15,
      },
  
},
    {timestamps:true} //  <=createdAt and updatedAt dates
)

module.exports = mongoose.model('ArtCollectible' , ArtCollectibleSchema )