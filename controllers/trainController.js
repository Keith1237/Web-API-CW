const Train = require('../models/train');



exports.createTrain = async (req, res) => {
    try {
        
        const existingTrain = await Train.findOne({ trainNumber: req.body.trainNumber });
        if (existingTrain) {
            return res.status(400).json({ message: 'Train with this number already exists.' });
        }

        const train = new Train({
            trainNumber: req.body.trainNumber,
            trainName: req.body.trainName
        });

        const newTrain = await train.save();
        res.status(201).json(newTrain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getTrains= async (req, res) => {
    try {
        const trains = await Train.find();
       
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

