const express = require('express');

const router = express.Router();

const carbonController = require(
  '../controllers/carbonController'
);

router.get(
  '/overview',
  carbonController.getCarbonOverview
);

router.get(
  '/monthly',
  carbonController.getMonthlyCarbonAnalytics
);

router.get(
  '/regions',
  carbonController.getRegionCarbonAnalytics
);

router.get(
  '/score',
  carbonController.getCarbonScore
);

module.exports = router;