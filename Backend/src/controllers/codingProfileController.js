const CP = require('../models/CodingProfile');

//createcodingProfile

const createCodingProfile = async (req, res) => {
    try {

        const codingprofile = await CP.create(req.body);
        
        res.status(201).send({ success: true, data: codingprofile });

    } catch (err) {

        res.status(400).send({ success: false, message: err.message });

    }
}

//allcoding Profiles
const getAllCodingProfiles = async (req, res) => {
    try {

        const codingprofile = await CP.find().sort({ order: 1 });

        if (!codingprofile) {
            res.status(404).send({ success: false, message: "No CodingProfiles" });
        }

        res.status(200).send({ success: true, data: codingprofile });



    } catch (err) {
        res.status(400).send({ success: false, message: err.message });

    }
}

//getCodingProfileById

const getCodingProfileById = async (req, res) => {
    try {

        const codingprofile = await CP.findById(req.params.id);

        if (!codingprofile) {

            res.status(404).send({ success: false, message: "Not Found" });

        }

        res.status(200).send({ success: true, data: codingprofile });

    } catch (err) {

        res.status(400).send({ success: false, message: err.message });

    }
}

//updateprofile
const updateCodingProfile = async (req, res) => {
    try {

        const codingprofile = await CP.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!codingprofile) {

            res.status(404).send({ success: false, message: "Not Found" });

        }

        res.status(200).send({ success: true, data: codingprofile });

    } catch (err) {

        res.status(400).send({ success: false, message: err.message });

    }
}

//deleteProfile
const deleteCodingProfile = async (req, res) => {
    try {

        const codingprofile = await CP.findByIdAndDelete(req.params.id);

        if (!codingprofile) {

            res.status(404).send({ success: false, message: "Not Found" });

        }

        res.status(200).send({ success: true, data: {} });

    } catch (err) {

        res.status(400).send({ success: false, message: err.message });

    }
}

module.exports = { createCodingProfile, getAllCodingProfiles, getCodingProfileById, updateCodingProfile, deleteCodingProfile }