const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Train schema and model
const trainSchema = new mongoose.Schema({
    trainNumber: { type: String, required: true },
    currentLocation: {
        coordinates: {
            type: [Number], // [longitude, latitude]
            // index: '2dsphere' ,// Geospatial index for coordinates
            required: true
        }
    },

    Timestamp: { type: Date, default: Date.now }
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
