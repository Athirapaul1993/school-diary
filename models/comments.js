const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

const commentsSchema = new Schema({
 

    text: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required:true,
        default: moment(Date.now()).format('MMMM Do YYYY, h:mm a')
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pupils',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'remarks',
        required: true
    }
 
}, {
    timestamps: true,
});

let commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;