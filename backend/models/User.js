const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // We added the Name field here!
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    balance: { type: Number, default: 1000.00 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);