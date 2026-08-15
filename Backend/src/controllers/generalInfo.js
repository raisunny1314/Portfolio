const GeneralInfo = require('../models/GeneralInfo');

const getGeneralInfo = async (req, res) => {
    try {
        const info = await GeneralInfo.findOne();
        if (!info) {
            return res.status(404).send({ success: false, message: "Not Found" });
        }
        return res.status(200).send({ success: true, data: info });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

const upsertGeneralInfo = async (req, res) => {
    try {
        const info = await GeneralInfo.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true,
        });
        return res.status(200).send({ success: true, data: info });
    } catch (err) {
        return res.status(400).send({ success: false, message: err.message });
    }
}

module.exports = { getGeneralInfo, upsertGeneralInfo };