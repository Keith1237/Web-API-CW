const trainRoute = require('../models/trainRoute');
const Route = require('../models/railwayRoute');
const Train = require('../models/train');




exports.updateCurrentLocation = async (req, res) => {
    const { trainRouteNumber, coordinates } = req.body;

    try {
        const trainRouteToUpdate = await trainRoute.findOne({ trainRouteNumber });
        if (!trainRouteToUpdate) {
            return res.status(404).json({ message: 'Train route not found' });
        }
        trainRouteToUpdate.currentLocation.coordinates = coordinates;
        const updatedTrainRoute = await trainRouteToUpdate.save();

        res.status(200).json(updatedTrainRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



exports.createTrainRoute = async (req, res) => {
    const trainRoutes = new trainRoute({
        trainRouteNumber: req.body.trainRouteNumber,
        trainNumber: req.body.trainNumber,
        routeNumber: req.body.routeNumber,
        currentLocation: {
            type: 'Point',
            coordinates: req.body.coordinates
        },
        departure: req.body.departure,
        arrival: req.body.arrival
    });
    try {

        const haveTrainRoute = await trainRoute.findOne({ trainRouteNumber: req.body.trainRouteNumber });
        if (haveTrainRoute) {
            return res.status(400).json({ message: 'Train route with this  Train Route Number already exists.' });
        }

        const routeNumberInRoute = await Route.findOne({ routeNumber: req.body.routeNumber });
        if (!routeNumberInRoute) {
            return res.status(400).json({ message: 'Railway route with this Route Number does not exist.' });
        }

        const trainNumberInTrainRoute = await Train.findOne({ trainNumber: req.body.trainNumber });
        if (!trainNumberInTrainRoute) {
            return res.status(400).json({ message: 'Railway route with this train number does not exists.' });
        }

        const includedInTrainRoute = await trainRoute.findOne({ trainNumber: req.body.trainNumber });
        if (includedInTrainRoute) {
            return res.status(400).json({ message: 'Railway route with this train Number connected with train in train route.' });
        }

        const newTrainRoute = await trainRoutes.save();
        res.status(201).json(newTrainRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updateTrainRoute = async (req, res) => {
    try {

        const haveTrainRoute = await trainRoute.findOne({ trainRouteNumber: req.body.trainRouteNumber });
        if (!haveTrainRoute) {
            return res.status(400).json({ message: 'Train route with this  Train Route Number does not exist.' });
        }

        const trainNumberInTrain = await Train.findOne({ trainNumber: req.body.trainNumber });

        if (!trainNumberInTrain) {
            return res.status(400).json({ message: 'Railway route with this train Number does not exist.' });
        }

        const trainNumberInTrainRoute = await trainRoute.findOne({ trainNumber: req.body.trainNumber });

        if (trainNumberInTrainRoute) {
            return res.status(400).json({ message: 'Train route with this train number already connected wth another route.' });
        }

        const updatedTrainRoute = await trainRoute.findOneAndUpdate(
            { trainRouteNumber: req.body.trainRouteNumber },
            {
                trainNumber: req.body.trainNumber,
                departure: req.body.departure,
                arrival: req.body.arrival
            },
            { new: true }
        );



        if (!updatedTrainRoute) {
            return res.status(404).json({ message: "Train route not found" });
        }

        res.status(200).json(updatedTrainRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getTrainRoutes = async (req, res) => {
    try {
        const trainRoutes = await trainRoute.find();

        res.json(trainRoutes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTrainRoutesByNumber = async (req, res) => {
    try {
        const { trainRouteNumber } = req.query;
        let trainRouteData;

        if (trainRouteNumber) {
            trainRouteData = await trainRoute.findOne({ trainRouteNumber });
        } else {
            trainRouteData = await trainRoute.find();
        }

        res.json(trainRouteData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
