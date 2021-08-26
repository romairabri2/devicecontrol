'use strict'

var express = require('express');
var DeviceController = require('../controllers/device');

var router = express.Router();

//Rutas
router.post('/save', DeviceController.save);
router.get('/devices/:last?', DeviceController.getDevices);
router.get('/device/:id', DeviceController.getDevice);
router.put('/device/:id', DeviceController.update);
router.delete('/device/:id', DeviceController.delete);

router.get('/search/:search',  DeviceController.search);

module.exports = router;
