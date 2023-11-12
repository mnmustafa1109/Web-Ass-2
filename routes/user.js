const express = require('express');
const router = express.Router();

var user_controller = require('../controllers/user');

const upload = require('../middleware/upload');
const authenticateJWT = require('../middleware/authentication');

router.post('/register', user_controller.register);

router.post('/login', user_controller.login);

router.post('/logout', user_controller.logout);

router.get('/profile', user_controller.profile);

router.post('/profile-pic',upload.single('profilePicture'), user_controller.profile_pic);

router.post('/follow/:id',authenticateJWT, user_controller.follow_user);

router.post('/unfollow/:id',authenticateJWT, user_controller.unfollow_user);

router.get('/feed',authenticateJWT, user_controller.feed);

router.get('/notifications',authenticateJWT, user_controller.notifications);


module.exports = router;
