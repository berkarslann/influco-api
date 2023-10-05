const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Kullanıcıyım, influencerların etkinliklerine katılmak istiyorum
const userSchema = new Schema({

    userType:{
        type: String,
        default: 'user'
    },
    email:{
         type: String,
         required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Influencer'
        }


    ],
    subseries: [
        {
            type: Schema.Types.ObjectId,
            ref:'Serie'
        }
    ],
    wallet:{
        type:Number
       
    }

})

module.exports = mongoose.model('User', userSchema)