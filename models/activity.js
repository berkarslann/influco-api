const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({

    influencer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Influencer'
    },
    title:{
        type:String,
        required: true
    },
    location: {
        type:String,
        required: true
    },
    sponsor: {
        type: Schema.Types.ObjectId,
    },
    shortDescription: {
        type: String,
        required: true
    },
    time: {
        type: String,
    }


})

module.exports = mongoose.model('Activity', activitySchema)