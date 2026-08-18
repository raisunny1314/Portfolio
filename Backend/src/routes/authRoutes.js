const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/authController');
const adminMiddleware = require('../middleware/adminMiddleware');




router.post('/admin/login',login);
router.get('/admin/verify',adminMiddleware,(req,res)=>{
    res.status(200).json({admin:true});
});
// router.post('/admin/register',register);

module.exports = router;