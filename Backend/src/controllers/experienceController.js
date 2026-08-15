const Experience = require('../models/Experience');

const createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        return res.status(201).send({ success: true, data: experience });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const getAllExperiences = async (req, res) => {
    try {
        const experience = await Experience.find().sort({ order: 1 });
        return res.status(200).send({ success: true, data: experience });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: experience });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!experience) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: experience });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: {} });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

module.exports = { createExperience, getAllExperiences, getExperienceById, updateExperience, deleteExperience };