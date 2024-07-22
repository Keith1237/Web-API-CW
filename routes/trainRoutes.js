const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

router.post('/addTrain', trainController.createTrain);
router.post('/addStation',trainController.createStation); 
router.get('/getStations',trainController.getStations);
router.get('/getStationByName',trainController.getStationByName)
router.post('/addLine',trainController.createLine);

module.exports = router;
