const express = require('express');
const { scanWebsite, generateReport } = require('../controllers/scanController');
const router = express.Router();

router.post('/', scanWebsite);
router.post('/download-report', generateReport);

module.exports = router;
