const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const trainRoutes = require('./routes/routes');

const app = express();
const port = 3000;

// Middleware
//app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.error(err));

app.use('/trains', trainRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
