const express = require('express');
const router = express.Router();
const { getAllPrices, getCropPrice } = require('../controllers/marketController');

router.get('/', getAllPrices);
router.get('/:crop', getCropPrice);

module.exports = router; 