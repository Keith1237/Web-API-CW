const Line = require('../models/lines');

exports.createLine = async (req, res) => {

    const line = new Line({
        lineNumber: req.body.lineNumber,
        lineName: req.body.lineName,
        junctions: {
            type: 'Point',
            have: req.body.have && req.body.have.length > 0 ? req.body.have : ["NO"]
        },
        startStation: req.body.startStation,
        endStation: req.body.endStation
    });

    try {
        const alreadyHaveLine = await Line.findOne({ lineNumber: req.body.lineNumber });
        const alreadyHaveName = await Line.findOne({lineName: req.body.lineName});
        
        if (alreadyHaveLine) {
            return res.status(400).json({ message: 'Line with this number already exists.' });
        }
        if(alreadyHaveName){
            return res.status(400).json({ message: 'Line with this name already exists.' });
        }
        const newLine = await line.save();
        res.status(201).json(newLine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getDetails= async (req, res) => {
    try {
        const lines = await Line.find();
        console.log(req.query.stationName);
        res.json(lines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};