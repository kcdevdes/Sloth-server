const express = require('express');
const { param, body } = require('express-validator');
const { validate } = require('../models/user.model');
const {
  uploadArticle, updateArticle, searchArticle, deleteArticle,
} = require('../services/article.service');
const { authenticate } = require('../services/auth.service');

const router = express.Router();

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
