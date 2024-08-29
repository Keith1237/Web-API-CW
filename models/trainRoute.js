const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Lines schema and model
const trainRouteSchema = new mongoose.Schema({
    trainRouteNumber:{type: String, required:true},
    routeNumber: { type: String, required: true },
    trainNumber: {type:String,required:true},
    departure: {type:String,required:true},
    arrival:{type:String,required:true},
    currentLocation: {
        coordinates: {
            type: [Number], 
            required: true
        }
    },
    Timestamp: { type: Date, default: Date.now }
});

const trainRoute = mongoose.model('trainRoute', trainRouteSchema);

module.exports = trainRoute;
