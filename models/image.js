const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({


    image: {
        name:String,
        buffer: Buffer,
        contentType: String,
       // default: '../public/gmail.png',  // I want the user to uploud the image!
      },

})

module.exports = mongoose.model('Image' ,imageSchema )