const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// 1. PLACE AN ORDER (Checkout)
router.post('/checkout', async (req, res) => {
    try {
        const { userId, items, cartTotal, address, phone } = req.body;
        
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Your shopping cart is empty." });
        }

        const newOrder = new Transaction({
            userId: userId || 'Guest',
            items: items,
            cartTotal: Number(cartTotal) || 0,
            shippingAddress: address || 'No Address Provided',
            phone: phone || 'No Phone Provided',
            status: 'Shipped'
        });

        await newOrder.save();
        return res.status(200).json({ message: "Order processed successfully!" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// 2. FETCH SPECIFIC USER ORDERS HISTORY (Safe Filtering)
router.get('/history/:userId', async (req, res) => {
    try {
        const userIdParam = req.params.userId;
        
        // Handle fallback if frontend drops undefined string literal
        if (!userIdParam || userIdParam === 'undefined' || userIdParam === 'null') {
            return res.status(200).json([]);
        }

        // Find all records belonging strictly to this user ID
        const orders = await Transaction.find({ userId: userIdParam });
        
        // Clean up broken/malformed old test entries on-the-fly so the frontend doesn't crash
        const verifiedOrders = orders.filter(order => order && Array.isArray(order.items));

        return res.status(200).json(verifiedOrders);
    } catch (err) {
        return res.status(500).json({ message: "Database Error: " + err.message });
    }
});

module.exports = router;
