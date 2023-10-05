const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Only influencer can post serie
const serieSchema = new Schema({
    
    influencer:{
      type: Schema.Types.ObjectId,
        ref: 'Influencer',
        required: true
    },

    name: {
        type:String, 
        required: true
    },
    shortDescription: {
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    members:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      
      }  
    ],
    imageUrl: {
        type: String

      },
      videos:[
        {
          type: Schema.Types.ObjectId,
          ref: 'Video'
        }
      ]



})



module.exports = mongoose.model('Serie', serieSchema)