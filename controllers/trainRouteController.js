const trainRoute = require('../models/trainRoute');


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
        const newTrainRoute = await trainRoutes.save();
        res.status(201).json(newTrainRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updateTrainRoute = async (req, res) => {
    try {
        const updatedTrainRoute = await trainRoute.findOneAndUpdate(
            { trainRouteNumber: req.body.trainRouteNumber }, 
            {
                trainNumber: req.body.trainNumber,
                routeNumber: req.body.routeNumber,
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

exports.getTrainRoutes= async (req, res) => {
    try {
        const trainRoutes = await trainRoute.find();
       
        res.json(trainRoutes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

