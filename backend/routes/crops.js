const express = require('express');
const router = express.Router();
const { getCropAdvisory, getCropsBySeason } = require('../controllers/cropController');

router.get('/:season', getCropsBySeason);
router.get('/:season/:crop', getCropAdvisory);

module.exports = router; 