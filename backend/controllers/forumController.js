const asyncHandler = require('express-async-handler');
const Forum = require('../models/Forum');

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Forum.find().sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Create new forum post
// @route   POST /api/forum
// @access  Public
const createPost = asyncHandler(async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    res.status(400);
    throw new Error('Please provide name and message');
  }

  const post = await Forum.create({
    name,
    message
  });

  res.status(201).json(post);
});

// @desc    Delete forum post
// @route   DELETE /api/forum/:id
// @access  Public
const deletePost = asyncHandler(async (req, res) => {
  const post = await Forum.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.deleteOne();
  res.json({ message: 'Post removed' });
});

module.exports = {
  getPosts,
  createPost,
  deletePost
}; 