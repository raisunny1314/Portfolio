const express = require('express');
const router = express.Router();


const { createCodingProfile, getAllCodingProfiles, getCodingProfileById, updateCodingProfile, deleteCodingProfile } = require('../controllers/codingProfileController');
const adminMiddleware = require('../middleware/adminMiddleware');
//public
router.get('/codingprofile', getAllCodingProfiles);
router.get('/codingprofile/:id', getCodingProfileById);

//admin

router.post('/admin/codingprofile', adminMiddleware,createCodingProfile);
router.put('/admin/codingprofile/:id',adminMiddleware, updateCodingProfile);
router.delete('/admin/codingprofile/:id',adminMiddleware, deleteCodingProfile);

module.exports = router;