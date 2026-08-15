const mongoose = require('mongoose');


const experienceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['work', 'education'],
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    institution: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,

    },
    endDate: {
        type: String,

    },
    description: {
        type: String,
        trim: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);