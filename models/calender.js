const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

const calenderSchema = new Schema({
 

    title: {
        type: String,
        required: true
    },

    start: {
        type: String,
        required:true,
        // default: moment(Date.now()).format('MMMM Do YYYY, h:mm a')
    },

    end: {
        type: String,
        // default: moment(Date.now()).format('MMMM Do YYYY, h:mm a')
    }
 
}, {
    timestamps: true,
});

let calenderModel = mongoose.model('calender', calenderSchema);

module.exports = calenderModel;