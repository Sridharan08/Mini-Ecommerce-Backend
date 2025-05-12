const productModel = require('../models/productModel');

//Get All Products API - /api/v1/products
exports.getProducts = async (req, res) => {
    const query = req.query.keyword?{name : {
        $regex: req.query.keyword,
        $options: 'i'
    }}:{}
    const products = await productModel.find(query);
    res.json({ 
        success: true,
        products,
        message: 'Get all products!' });
}

//Get Single Product API - /api/v1/product/:id
exports.getSingleProduct = async (req, res) => {
    try {
        const products = await productModel.findById(req.params.id);
        res.json({ 
            success: true,
            products,
            message: 'Get Single product!' });

    } catch (error) {
        res.status(404).json({ 
            success: false,
            message: 'Unable to get product with ID!' });
    }
}