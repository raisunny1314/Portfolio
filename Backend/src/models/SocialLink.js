const mongoose = require('mongoose');



const socialLinkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model('SocialLink', socialLinkSchema);