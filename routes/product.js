var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/product');

const isAdmin = require('../middleware/authorization');

router.get('/test', isAdmin, product_controller.test);

router.post('/create', product_controller.product_create);

router.get('/:id', product_controller.product_details);

router.put('/:id/update', product_controller.product_update);

router.delete('/:id/delete', product_controller.product_delete);

router.get('/', product_controller.product_list);


module.exports = router;