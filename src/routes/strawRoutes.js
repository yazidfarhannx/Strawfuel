const express = require('express');
const router = express.Router();

const strawController = require('../controllers/strawController');

router.post('/', strawController.createStraw);

router.get('/', strawController.getAllStraw);

router.get('/:id', strawController.getStrawById);

router.put('/:id', strawController.updateStraw);

router.delete('/:id', strawController.deleteStraw);

module.exports = router;