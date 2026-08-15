const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }

}, { _id: false });


const generalInfoSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    title: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
    },
    statusBanner: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
    },
    bio: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 10,
        trim: true,
    },
    resume: {
        type: String,
        trim: true,
    },
    metrics: [metricSchema],

}, { timestamps: true });

module.exports = mongoose.model('GeneralInfo', generalInfoSchema);