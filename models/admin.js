const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Train schema and model
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password : {type: String, required: true },
    Timestamp: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
