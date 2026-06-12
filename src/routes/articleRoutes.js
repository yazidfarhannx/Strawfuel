const express = require('express');

const router = express.Router();

const articleController = require(
  '../controllers/articleController'
);

const verifyToken = require(
  '../middleware/verifyToken'
);

const roleMiddleware = require(
  '../middleware/roleMiddleware'
);

const upload = require(
  '../middleware/uploadArticle'
);

// PUBLIC
router.get(
  '/',
  articleController.getAllArticles
);

router.get(
  '/:id',
  articleController.getArticleById
);

// ADMIN
router.post(
  '/',
  verifyToken,
  roleMiddleware(['admin']),
  upload.single('thumbnail'),
  articleController.createArticle
);

router.put(
  '/:id',
  verifyToken,
  roleMiddleware(['admin']),
  upload.single('thumbnail'),
  articleController.updateArticle
);

router.delete(
  '/:id',
  verifyToken,
  roleMiddleware(['admin']),
  articleController.deleteArticle
);

module.exports = router;