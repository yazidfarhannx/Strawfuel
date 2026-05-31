const express = require('express');

const router = express.Router();

const mapController = require(
  '../controllers/mapController'
);

const verifyToken = require(
  '../middleware/verifyToken'
);

const roleMiddleware = require(
  '../middleware/roleMiddleware'
);

// PUBLIC
router.get(
  '/regions',
  mapController.getRegions
);

router.get(
  '/regions/:id',
  mapController.getRegionById
);

// ADMIN ONLY
router.post(
  '/regions',
  verifyToken,
  roleMiddleware(['admin']),
  mapController.createRegion
);

router.put(
  '/regions/:id',
  verifyToken,
  roleMiddleware(['admin']),
  mapController.updateRegion
);

router.delete(
  '/regions/:id',
  verifyToken,
  roleMiddleware(['admin']),
  mapController.deleteRegion
);

module.exports = router;