const express = require('express');

const router = express.Router();

const adminController = require(
  '../controllers/adminController'
);

const verifyToken = require(
  '../middleware/verifyToken'
);

const roleMiddleware = require(
  '../middleware/roleMiddleware'
);

// ADMIN ONLY
router.get(
  '/users',
  verifyToken,
  roleMiddleware(['admin']),
  adminController.getAllUsers
);

router.delete(
  '/users/:id',
  verifyToken,
  roleMiddleware(['admin']),
  adminController.deleteUser
);

router.put(
  '/users/:id/role',
  verifyToken,
  roleMiddleware(['admin']),
  adminController.updateUserRole
);

router.get(
  '/summary',
  verifyToken,
  roleMiddleware(['admin']),
  adminController.getSystemSummary
);

module.exports = router;