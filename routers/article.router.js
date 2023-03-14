const express = require('express');
const { param, body } = require('express-validator');
const { validate } = require('../models/user.model');
const {
  uploadArticle, updateArticle, searchArticle, deleteArticle,
} = require('../services/article.service');
const { authenticate } = require('../services/auth.service');

const router = express.Router();

/**
 * GET /article/:articleId
 * Returns the article object of the given articleId
 */
router.get(
  '/:articleId',
  [
    param('articleId').notEmpty().isUUID(),
    validate,
  ],
  async (req, res) => {
    await searchArticle(req, res);
  },
);

/**
 * POST /article/
 * Uploads a new article with the given values
 * and returns the newly issued id of the article
 * Authentication Required
 */
router.post(
  '/',
  [
    body('title').notEmpty().isString(),
    body('content').notEmpty().isString(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await uploadArticle(req, res);
  },
);

/**
 * PUT /article/:articleId
 * Updates the article that has the articleId on the param
 * Authentication Required
 */
router.put(
  '/:articleId',
  [
    body('title').optional().isString(),
    body('content').optional().isString(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await updateArticle(req, res);
  },
);

/**
 * DELETE /article/:articleId
 * Deletes the article that has the articleId on the param
 * Authentication Required
 */
router.delete(
  '/:articleId',
  [
    param('articleId').notEmpty().isUUID(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await deleteArticle(req, res);
  },
);

module.exports = router;
