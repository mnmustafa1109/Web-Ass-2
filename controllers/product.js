var Product = require('../models/product');

exports.test = function (req, res) {
    res.send('IsAdmin Working working!');
};

exports.product_create = async function (req, res) {
    try {
        var product = new Product(
            {
                name: req.body.name,
                price: req.body.price
            }
        );
        product = await product.save();
        res.status(201).json({ message: 'Product Created successfully. with id: ' + product._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Product Creation failed.' });
    }
};

exports.product_details = async function (req, res) {
    try {
        var product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Product Fetching failed.' });
    }
};

exports.product_update = async function (req, res) {
    try {
        var product =await Product.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: 'Product udpated.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Product Updation failed.' });
    }
};

exports.product_delete = async function (req, res) {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Product deleted.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Product Deletion failed.' });
    }
};

exports.product_list = async function (req, res) {
    try {
        var products = await Product.find({}).lean();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Product Listing failed.' });
    }
};