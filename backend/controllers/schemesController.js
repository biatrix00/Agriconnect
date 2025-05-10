const asyncHandler = require('express-async-handler');
const schemes = require('../data/schemes');

// @desc    Get all government schemes
// @route   GET /api/schemes
// @access  Public
const getAllSchemes = asyncHandler(async (req, res) => {
  res.json(schemes);
});

// @desc    Get scheme by ID
// @route   GET /api/schemes/:id
// @access  Public
const getSchemeById = asyncHandler(async (req, res) => {
  const scheme = schemes.find(s => s.id === parseInt(req.params.id));
  
  if (!scheme) {
    res.status(404);
    throw new Error('Scheme not found');
  }

  res.json(scheme);
});

module.exports = {
  getAllSchemes,
  getSchemeById
}; 