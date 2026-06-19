const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: { type: String, required: true, unique: true }, // e.g., 'AAPL', 'TSLA'
    name: { type: String, required: true },
    price: { type: Number, required: true },
    dailyHigh: { type: Number },
    dailyLow: { type: Number },
    historicalData: [{
        date: { type: Date, default: Date.now },
        price: { type: Number }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Stock', StockSchema);