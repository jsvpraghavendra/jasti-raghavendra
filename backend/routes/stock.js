const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock'); 

// Default shop data matching your exact database keys
const defaultProducts = [
    { name: 'Shopez Luxury Wireless Headphones', symbol: 'AAPL', price: 175.50, quantity: 10 },
    { name: 'Shopez Eco Smart Watch', symbol: 'TSLA', price: 180.20, quantity: 15 },
    { name: 'Shopez Ultra Slim Laptop', symbol: 'MSFT', price: 420.10, quantity: 5 },
    { name: 'Shopez Leather Backpack', symbol: 'AMZN', price: 178.00, quantity: 20 }
];

// Seed function using the correct 'symbol' field
async function seedDatabase() {
    try {
        const count = await Stock.countDocuments();
        if (count === 0) {
            await Stock.insertMany(defaultProducts);
            console.log('Shopez shop items successfully populated into MongoDB database!');
        }
    } catch (err) {
        console.error('Error seeding data inventory:', err.message);
    }
}
seedDatabase();

// 1. GET ALL SHOP PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Stock.find();
        
        // Format it so the frontend index.html grid maps correctly
        const formattedProducts = {};
        products.forEach(item => {
            formattedProducts[item.symbol] = { name: item.name, price: item.price };
        });
        
        res.json(formattedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET SINGLE PRODUCT
router.get('/:symbol', async (req, res) => {
    try {
        const product = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
        if (!product) return res.status(404).json({ message: "Product item not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
