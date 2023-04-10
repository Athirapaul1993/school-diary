const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const noticeSchema = new Schema({


    description: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true,
        default: moment(Date.now()).format('MMMM Do YYYY'),
    },

    type: {
        type: String,
        enum: ['General Event', 'Volunteering Activity', 'Homework', 'Student Achievement']
    },
    volunteers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pupil',
            required: false
        }],
       
    }

}, {
    timestamps: true,
});


let NOTICE = mongoose.model('notice', noticeSchema);

module.exports = NOTICE;