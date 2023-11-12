const express = require('express');
const router = express.Router();

var user_controller = require('../controllers/user');

const upload = require('../middleware/upload');

router.post('/register', user_controller.register);

router.post('/login', user_controller.login);

router.post('/logout', user_controller.logout);

router.get('/profile', user_controller.profile);

router.post('/profile-pic',upload.single('profilePicture'), user_controller.profile_pic);

router.post('/follow/:id', user_controller.follow_user);

router.post('/unfollow/:id', user_controller.unfollow_user);

router.get('/feed', user_controller.feed);

router.get('/notifications', user_controller.notifications);


module.exports = router;
