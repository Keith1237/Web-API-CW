const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const stationController = require('../controllers/stationcontroller');
const linesController = require('../controllers/linesController');
const routeController = require('../controllers/routesController');

router.post('/addTrain', trainController.createTrain);
router.post('/addStation',stationController.createStation); 
router.get('/Stations',stationController.getStations);
router.get('/getStationByName',stationController.getStationByName)
router.post('/lines',linesController.createLine);
router.get('/lines',linesController.getDetails);
router.post('/routes',routeController.createRoute);
router.get('/routes',routeController.getRoutes);
router.get('/routesByStations',routeController.getRoutesByStations);

module.exports = router;
