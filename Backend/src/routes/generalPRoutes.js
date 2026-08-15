const express = require('express');
const router = express.Router();

const { getGeneralInfo, upsertGeneralInfo } = require('../controllers/generalInfo')
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/generalinfo', getGeneralInfo);
router.put('/admin/generalinfo',adminMiddleware, upsertGeneralInfo);

module.exports = router;