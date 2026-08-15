const express = require('express');
const router = express.Router();

const { createExperience, getAllExperiences, getExperienceById, updateExperience, deleteExperience } = require('../controllers/experienceController');


//public
router.get('/experience', getAllExperiences);
router.get('/experience/:id', getExperienceById);

//admin
router.post('/admin/experience', createExperience);
router.put('/admin/experience/:id', updateExperience);
router.delete('/admin/experience/:id', deleteExperience);

module.exports = router;