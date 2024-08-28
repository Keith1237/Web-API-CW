// const { MongoCryptInvalidArgumentError } = require('mongodb');
const Route = require('../models/railwayRoute');
const Line = require('../models/lines');
const trainRoute = require('../models/trainRoute');


exports.createRoute = async (req, res) => {
    const route = new Route({
        lineNumbers: {
            type: 'Point',
            lines: req.body.lines
        },
        routeNumber: req.body.routeNumber,
        startStation: req.body.startStation,
        endStation: req.body.endStation,
        distance: req.body.distance,
        stationsInRoute: req.body.stationsInRoute
    });
    try {
        const haveRouteNumber = await Route.findOne({ routeNumber: req.body.routeNumber });
        
        if (haveRouteNumber) {
            return res.status(400).json({ message: 'Railway route with this Route Number already exists.' });
        }

        const lineNumbers = req.body.lines; // The array of line numbers to check

        // Check if each line number exists in the 'lines' collection
        const linesExist = await Promise.all(lineNumbers.map(async (lineNumber) => {
          const line = await Line.findOne({ lineNumber });
          return line !== null;
        }));
    
        // If every line exists in the collection
        const allLinesExist = linesExist.every(Boolean);
    
        if (!allLinesExist) {
          return res.status(400).json({ message: 'Line Number Enter are do not exist.' });
        }

        
       
        const newRoute = await route.save();
        res.status(201).json(newRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getRoutes= async (req, res) => {
    try {
        const routes = await Route.find();
       
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRoutesByStations = async (req, res) => {
    try {
        const routes = await Route.find({
            stationsInRoute: {
                $all: [req.query.startStation, req.query.endStation]
            }
        });
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        const haveRouteNumber = await Route.findOne({ routeNumber: req.query.routeNumber });
        if (!haveRouteNumber) {
            return res.status(400).json({ message: 'Railway route with this Route Number does not exist.' });
        }
        const includedInTrainRoute = await trainRoute.findOne({ routeNumber: req.query.routeNumber });
        if (includedInTrainRoute) {
            return res.status(400).json({ message: 'Railway route with this Route Number connected with train in train route.' });
        }

        const route = await Route.findOneAndDelete({ routeNumber: req.query.routeNumber });

        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.json({ message: 'Route deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


