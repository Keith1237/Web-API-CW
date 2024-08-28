const Route = require('../models/railwayRoute');


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
        const route = await Route.findOneAndDelete({ routeNumber: req.query.routeNumber });

        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.json({ message: 'Route deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


