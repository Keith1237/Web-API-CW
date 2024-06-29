const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const trainRoutes = require('./routes/trainRoutes');

const app = express();
const port = 3000;

// Middleware
//app.use(bodyParser.json());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.error(err));

app.use('/trains', trainRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
