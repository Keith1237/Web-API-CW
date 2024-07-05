const Train = require('../models/train');
const Station = require('../models/stations');

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