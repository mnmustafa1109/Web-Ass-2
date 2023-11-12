const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// Admin routes
router.get('/users', adminController.viewAllUsers);

router.put('/block-user/:id', adminController.blockUser);

router.put('/unblock-user/:id', adminController.unblockUser);

router.get('/blogs', adminController.listAllBlogPosts);

router.get('/blog/:id', adminController.viewBlogPost);

router.put('/disable-blog/:id', adminController.disableBlog);

router.put('/enable-blog/:id', adminController.enableBlog);

module.exports = router;
