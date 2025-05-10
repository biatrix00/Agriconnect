const asyncHandler = require('express-async-handler');
const cropAdvisory = require('../data/cropAdvisory');

// @desc    Get crop advisory for a specific season and crop
// @route   GET /api/crops/:season/:crop
// @access  Public
const getCropAdvisory = asyncHandler(async (req, res) => {
  const { season, crop } = req.params;

  if (!cropAdvisory[season]) {
    res.status(404);
    throw new Error('Season not found');
  }

  if (!cropAdvisory[season][crop]) {
    res.status(404);
    throw new Error('Crop not found for this season');
  }

  res.json(cropAdvisory[season][crop]);
});

// @desc    Get all crops for a season
// @route   GET /api/crops/:season
// @access  Public
const getCropsBySeason = asyncHandler(async (req, res) => {
  const { season } = req.params;

  if (!cropAdvisory[season]) {
    res.status(404);
    throw new Error('Season not found');
  }

  const crops = Object.keys(cropAdvisory[season]);
  res.json(crops);
});

module.exports = {
  getCropAdvisory,
  getCropsBySeason
}; 