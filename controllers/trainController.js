const Train = require('../models/train');
const Station = require('../models/stations');
const Line = require('../models/lines');

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

// Create  a new Train
exports.createTrain = async (req, res) => {
    const train = new Train({
        trainNumber: req.body.trainNumber,
        trainName : req.body.trainName,
        currentLocation: {
            type: 'Point',
            coordinates: req.body.coordinates
        }
    });

    try {
        const newTrain = await train.save();
        res.status(201).json(newTrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

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
        const newStation = await station.save();
        res.status(201).json(newStation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createLine = async (req, res) => {
    const line = new Line({
        trainNumber: req.body.trainNumber,
        routeNumber: req.body.routeNumber,
        currentLocation: {
            type: 'Point',
            coordinates: req.body.coordinates
        }
    });

    try {
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