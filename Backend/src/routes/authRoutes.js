const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/authController');




router.post('/admin/login',login);
// router.post('/admin/register',register);

module.exports = router;