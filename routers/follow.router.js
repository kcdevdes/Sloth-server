const express = require('express');
const { param } = require('express-validator');
const validate = require('../middlewares/validator.middleware');
const { authenticate } = require('../services/auth.service');
const { followUser, unfollowUser } = require('../services/follow.service');

const router = express.Router();

router.post(
  '/:userId',
  [
    param('userId').notEmpty().isUUID(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await followUser(req, res);
  },
);

router.delete(
  '/:userId',
  [
    param('userId').notEmpty().isUUID(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await unfollowUser(req, res);
  },
);

module.exports = router;
