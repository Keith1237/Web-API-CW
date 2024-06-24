const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Train schema and model
const trainSchema = new mongoose.Schema({
    trainNumber: Number,
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere' // Geospatial index for coordinates
    }
});

const Train = mongoose.model('Train', trainSchema);

// POST route to add train data
app.post('/trains', async (req, res) => {
    const { trainNumber, coordinates } = req.body;

    const newTrain = new Train({ trainNumber, coordinates });

    try {
        await newTrain.save();
        res.status(201).send(newTrain);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
