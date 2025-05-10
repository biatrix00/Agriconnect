const asyncHandler = require('express-async-handler');
const marketPrices = require('../data/marketPrices');

// @desc    Get all market prices
// @route   GET /api/market
// @access  Public
const getAllPrices = asyncHandler(async (req, res) => {
  res.json(marketPrices);
});

// @desc    Get price for specific crop
// @route   GET /api/market/:crop
// @access  Public
const getCropPrice = asyncHandler(async (req, res) => {
  const { crop } = req.params;
  const { variety } = req.query;

  if (!marketPrices[crop]) {
    res.status(404);
    throw new Error('Crop not found');
  }

  if (variety && marketPrices[crop][variety]) {
    res.json(marketPrices[crop][variety]);
  } else if (!variety) {
    res.json(marketPrices[crop]);
  } else {
    res.status(404);
    throw new Error('Variety not found');
  }
});

module.exports = {
  getAllPrices,
  getCropPrice
}; 