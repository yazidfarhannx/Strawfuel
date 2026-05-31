const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');

router.get('/stats', dashboardController.getDashboardStats);
router.get('/analytics', dashboardController.getMonthlyAnalytics);
router.get('/regions', dashboardController.getRegionStats);
router.get('/sustainability', dashboardController.getSustainabilityMetrics);

module.exports = router;