const Train = require('../models/train');
const Station = require('../models/stations');
const Line = require('../models/lines');
const Route = require('../models/routes');

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

// Create  a new Station
exports.createRoute = async (req, res) => {
    const route = new Route({
        lineNumbers: {
            type: 'Point',
            lines: req.body.lines
        },
        trainNumber: req.body.trainNumber,
        routeNumber: req.body.routeNumber,
        currentLocation: {
            type: 'Point',
            coordinates: req.body.coordinates
        },
        startStation: req.body.startStation,
        endStation: req.body.endStation
    });

    try {
        const newRoute = await route.save();
        res.status(201).json(newRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getRoutes= async (req, res) => {
    try {
        const routes = await Route.find();
        console.log(req.query.stationName);
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};