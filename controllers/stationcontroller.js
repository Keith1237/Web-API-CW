const Station = require('../models/stations');

// Create  a new Station
exports.createStation = async (req, res) => {
    const station = new Station({
        stationNumber: req.body.stationNumber,
        stationName: req.body.stationName,
        currentLocation: {
            type: 'Point',
            coordinates: req.body.coordinates
        }
    });

    try {
        const existingStation = await Station.findOne({ stationNumber: req.body.stationNumber });
        const alreadyHaveName = await Station.findOne({stationName: req.body.stationName});
        
        if (existingStation) {
            return res.status(400).json({ message: 'Station with this number already exists.' });
        }
        if(alreadyHaveName){
            return res.status(400).json({ message: 'Station with this name already exists.' });
        }
        const newStation = await station.save();
        res.status(201).json(newStation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// get all Stations
exports.getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get one station
exports.getStationByName = async (req, res) => {
    try {
        const stations = await Station.findOne({stationName:req.query.stationName});
        console.log(req.query.stationName);
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};