const SocialLink = require('../models/SocialLink');

const createSocialLink = async (req, res) => {
    try {
        const sociallink = await SocialLink.create(req.body);
        return res.status(201).send({ success: true, data: sociallink });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const getAllSocialLinks = async (req, res) => {
    try {
        const sociallink = await SocialLink.find().sort({ order: 1 });
        return res.status(200).send({ success: true, data: sociallink });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const getSocialLinkById = async (req, res) => {
    try {
        const sociallink = await SocialLink.findById(req.params.id);
        if (!sociallink) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: sociallink });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const updateSocialLink = async (req, res) => {
    try {
        const sociallink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!sociallink) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: sociallink });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const deleteSocialLink = async (req, res) => {
    try {
        const sociallink = await SocialLink.findByIdAndDelete(req.params.id);
        if (!sociallink) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: {} });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

module.exports = { createSocialLink, getAllSocialLinks, getSocialLinkById, updateSocialLink, deleteSocialLink };