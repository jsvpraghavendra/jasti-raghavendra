const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    stocks: [{
        symbol: { type: String, required: true },
        quantity: { type: Number, default: 0 },
        avgBuyPrice: { type: Number, default: 0 }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);