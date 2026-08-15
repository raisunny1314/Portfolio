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


const codingProfileSchema = new mongoose.Schema({
    platform: {
        type: String,
        enum: ['LeetCode','GitHub','GeeksforGeeks']
    },
    handle: {
        type: String,
        required: true,
        trim: true,
    },
    profileUrl: {
        type: String,
        trim: true,
    },
    metric: [metricSchema],
    icon: {
        type: String,
    },



}, { timestamps: true });

module.exports = mongoose.model('CodingProfile', codingProfileSchema);