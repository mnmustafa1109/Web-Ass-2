var express = require('express');
var router = express.Router();

var blog_controller = require('../controllers/blog');

const isAdmin = require('../middleware/authorization');

router.post('/create', blog_controller.blog_create);

router.get('/:id', blog_controller.blog_details);

router.put('/:id/update', blog_controller.blog_update);

router.delete('/:id/delete', blog_controller.blog_delete);

router.get('/', blog_controller.blog_list);

router.post('/:id/rate', blog_controller.blog_rate);

router.post('/:id/comment', blog_controller.blog_comment);

module.exports = router;
