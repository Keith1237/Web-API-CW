const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Lines schema and model
const routeSchema = new mongoose.Schema({
    routeNumber: { type: String, required: true },
    trainNumber: {type:String,required:true},
    lineNumbers: {
        lines: {
            type: [String], 
            required: true
        }
    },
    startStation: {type:String,required:true},
    endStation:{type:String,required:true},
    currentLocation: {
        coordinates: {
            type: [Number], // [longitude, latitude]
            // index: '2dsphere' ,// Geospatial index for coordinates
            required: true
        }
    },
    Timestamp: { type: Date, default: Date.now }
});

const Line = mongoose.model('Route', routeSchema);

module.exports = Line;
