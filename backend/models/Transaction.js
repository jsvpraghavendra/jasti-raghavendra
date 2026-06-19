const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: String, default: 'Guest' },
    items: { type: Array, required: true }, // Saves the whole cart
    cartTotal: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'Processing' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
