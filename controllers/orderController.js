const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel')

// Create Order - POST /api/v1/order
exports.createOrder = async (req, res) => {
    const { cartItems } = req.body; 

    if (!Array.isArray(cartItems) || cartItems.length == 0) {
        return res.status(400).json({
            success: false,
            message: 'Cart is empty',
        });
    }

    const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0));
    const status = 'Pending';

    const order = await orderModel.create({ cartItems, amount, status });


    //Update stock of each product in the order
    cartItems.forEach(async (item) => {
        const product = await productModel.findById(item.product._id);
        product.stock -= item.qty;
        await product.save();
    });


    res.json({
        success: true,
        order
    });

};