const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Lines schema and model
const routeSchema = new mongoose.Schema({
    routeNumber: { type: String, required: true },
    lineNumbers: {
        lines: {
            type: [String], 
            required: true
        }
    },
    startStation: {type:String,required:true},
    endStation:{type:String,required:true},
    stationsInRoute: { type: [String], required: true },
    distance:{type:Number, required:true}, 
    Timestamp: { type: Date, default: Date.now }
});

const Route = mongoose.model('railwayRoute', routeSchema);

module.exports = Route;
