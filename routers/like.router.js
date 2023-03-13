const express = require('express');
const { param } = require('express-validator');
const validate = require('../middlewares/validator.middleware');
const { authenticate } = require('../services/auth.service');
const { postNewLike } = require('../services/like.service');

const router = express.Router();

router.post(
  '/:articleId',
  [
    param('articleId').notEmpty().isUUID(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await postNewLike(req, res);
  },
);

module.exports = router;
