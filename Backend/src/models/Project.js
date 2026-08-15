const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    techStack: [
        {
            type: String,
            trim: true,
            required: true,
        }
    ],
    githubUrl: {
        type: String,
        trim: true,
    },
    liveUrl: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,

    },
    status: {
        type: String,
        enum: ['draft', 'live'],
        default: 'draft',
    },
    views: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Project',projectSchema)