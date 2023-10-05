const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Marka temsilcisiyim, influncerlarla anlaşmak, onlarla ortaklık kurmak istiyorum..
const brandSchema = new Schema({

    userType:{
        type: String,
        default: 'brand'
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    partnerships: [
        {
            type: Schema.Types.ObjectId,
          ref: 'Influencer'
        }
      ]


})

module.exports = mongoose.model('Brand', brandSchema)