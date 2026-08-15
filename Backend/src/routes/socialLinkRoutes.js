const express = require('express');
const router = express.Router();

const { createSocialLink, getAllSocialLinks, getSocialLinkById, updateSocialLink, deleteSocialLink } = require('../controllers/socialLink');
const adminMiddleware = require('../middleware/adminMiddleware');


//public
router.get('/sociallink', getAllSocialLinks);
router.get('/sociallink/:id', getSocialLinkById);

//admin
router.post('/admin/sociallink',adminMiddleware, createSocialLink);
router.put('/admin/sociallink/:id',adminMiddleware, updateSocialLink);
router.delete('/admin/sociallink/:id',adminMiddleware, deleteSocialLink);

module.exports = router;