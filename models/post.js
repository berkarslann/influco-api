const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    
    influencer:{
        type: Schema.Types.ObjectId,
        ref: 'Influencer'
    },

    title: {
        type:String
    },
    description: {
        type:String
    },
    
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)