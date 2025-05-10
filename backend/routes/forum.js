const express = require('express');
const router = express.Router();
const { getPosts, createPost, deletePost } = require('../controllers/forumController');

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);

module.exports = router; 