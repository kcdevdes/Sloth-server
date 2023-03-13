const express = require('express');
const { uploadArticle, updateArticle, searchArticle } = require('../services/article.service');
const { authenticate } = require('../services/auth.service');

const router = express.Router();

router.get('/:articleId', async (req, res) => {
  await searchArticle(req, res);
});

router.post('/', authenticate, async (req, res) => {
  await uploadArticle(req, res);
});

router.put('/:articleId', authenticate, async (req, res) => {
  await updateArticle(req, res);
});

module.exports = router;
