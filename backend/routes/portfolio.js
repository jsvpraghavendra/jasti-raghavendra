const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // Saving cart data into the portfolio collection

// 1. FETCH ALL ITEMS INSIDE A USER'S CART
router.get('/:userId', async (req, res) => {
    try {
        const cartItems = await Portfolio.find({ userId: req.params.userId });
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. ADD AN ITEM TO THE SHOPPING CART
router.post('/add', async (req, res) => {
    try {
        const { userId, ticker, quantity } = req.body; // ticker = product code

        let cartItem = await Portfolio.findOne({ userId, ticker });
        if (cartItem) {
            cartItem.quantity += Number(quantity);
        } else {
            cartItem = new Portfolio({ userId, ticker, quantity });
        }
        await cartItem.save();
        res.json({ message: "Item added to Shopez cart!", cart: cartItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;