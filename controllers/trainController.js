const Train = require('../models/train');

exports.createTrain = async (req, res) => {
    const train = new Train({
        trainNumber: req.body.trainNumber,
        trainName: req.body.trainName,
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



