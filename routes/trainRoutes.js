const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

router.post('/add', trainController.createTrain);
 
module.exports = router;
