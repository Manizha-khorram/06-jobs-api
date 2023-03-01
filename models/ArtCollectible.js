
const mongoose = require ('mongoose')

const ArtCollectibleSchema = new mongoose.Schema({
    
    //options which should be considered when creating a ArtCollectible
    paintingType :{
        type : String ,
        required : [ true , 'Please provide painting type'],
        enum : ['Oil' , 'WaterColor' , 'Acrylic' , 'Ink' , 'Mixed' ,'Gouache','Combination'],
        maxlength : 50 
    },

    artist : {
     type : mongoose.Types.ObjectId,
     ref: 'User',
     required : [true , 'Please provide artist name'],
     maxlength : 70 ,
    
    },
    price : {
     type : String ,
     required : [true , 'Please provide price for your art']

    } },
    {timestamps:true} //  <=createdAt and updatedAt dates
)

module.exports = mongoose.model('ArtCollectible' , ArtCollectibleSchema )