const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

// Lines schema and model
const lineSchema = new mongoose.Schema({
    lineNumber: { type: String, required: true },
    lineName: {type:String,required:true},
    junctions: {
        have: {
            type: [String], // [longitude, latitude]
            // index: '2dsphere' ,// Geospatial index for coordinates
            required: false,
            // validate: {
            //     validator: function(array) {
            //         return array.length > 0;
            //     },
            //     message: 'Junctions array cannot be empty'
            // }
        }
    },
    startStation: {type:String,required:true},
    endStation:{type:String,required:true},
    Timestamp: { type: Date, default: Date.now }
});

const Line = mongoose.model('Line', lineSchema);

module.exports = Line;
