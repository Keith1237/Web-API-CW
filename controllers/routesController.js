const Route = require('../models/routes');


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
        endStation: req.body.endStation,
        stationsInRoute: req.body.stationsInRoute
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