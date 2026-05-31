const express = require('express');
const router = express.Router();

const simulationController = require('../controllers/simulationController');

router.post('/calculate', simulationController.calculateSimulation);

module.exports = router;