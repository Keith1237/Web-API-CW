const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const stationController = require('../controllers/stationcontroller');
const linesController = require('../controllers/linesController');
const trainRouteController = require('../controllers/trainRouteController');
const railwayRouteContoller = require('../controllers/railwayRouteController');
const adminController = require('../controllers/adminController');

router.post('', trainController.createTrain);
router.get('',trainController.getTrains);

router.post('/Stations',stationController.createStation); 
router.get('/Stations',stationController.getStations);
router.get('/getStationByName',stationController.getStationByName);

router.post('/lines',linesController.createLine);
router.get('/lines',linesController.getDetails);

router.get('/trainRoute',trainRouteController.getTrainRoutes);
router.post('/trainRoute',trainRouteController.createTrainRoute);
router.put('/trainRoute',trainRouteController.updateTrainRoute);

router.post('/railwayRoutes',railwayRouteContoller.createRoute);
router.get('/railwayRoutes',railwayRouteContoller.getRoutes);
router.get('/railwayRoutesByStations',railwayRouteContoller.getRoutesByStations);
router.delete('/railwayRoutes',railwayRouteContoller.deleteRoute);

router.post('/admin',adminController.createAdmin);
router.get('/admin',adminController.getAdmin);
router.delete('/admin',adminController.deleteAdmin);

module.exports = router;
