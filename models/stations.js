const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Station schema and model
const trainSchema = new mongoose.Schema({
    stationNumber : {type: String,required: true},
    stationName : { type: String, required: true },
    currentLocation: {
        coordinates: {
            type: [Number],
            required: true
        }
    },

    Timestamp: { type: Date, default: Date.now }
});

const Station = mongoose.model('Station', trainSchema);

module.exports = Station;
