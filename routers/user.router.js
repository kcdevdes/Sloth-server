const express = require('express');

const { body, param } = require('express-validator');
const validate = require('../middlewares/validator.middleware');
const { authenticate } = require('../services/auth.service');
const { getUserProfile, updateUserProfile, updateUserPassword } = require('../services/user.service');

const router = express.Router();

/**
 * GET /user/:userId
 * Returns User profile without sensitivie data
 */
router.get(
  '/:userId',
  [
    param('userId').isUUID().notEmpty(),
    validate,
  ],
  async (req, res) => {
    await getUserProfile(req, res);
  },
);

/**
 * PUT /user/:userId
 * Updates user profile with the given data
 * Password cannot be changed with this endpoint. Use `PUT /user/:userId/password`
 */
router.put(
  '/:userId',
  [
    param('userId').notEmpty().isUUID(),
    body('email').isEmail().optional(),
    body('avatarUrl').isURL().optional(),
    body('displayName').isString().isLength({ min: 4, max: 32 }).optional(),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await updateUserProfile(req, res);
  },
);

/**
 * PUT /user/:userId/password
 * Updates user password
 * REQUIRES THE CURRENT PASSWORD AND THE NEW PASSWORD SIMULTANEOUSLY
 */
router.put(
  '/:userId/password',
  [
    param('userId').notEmpty().isUUID(),
    body('currentPassword').notEmpty().trim().isLength({ min: 8 }),
    body('newPassword').notEmpty().trim().isLength({ min: 8 }),
    validate,
  ],
  authenticate,
  async (req, res) => {
    await updateUserPassword(req, res);
  },
);

module.exports = router;
