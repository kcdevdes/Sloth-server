const express = require('express');
const { body } = require('express-validator');
const logger = require('../middlewares/logger.middleware');
const {
  authenticate, login, logout, signup,
} = require('../services/auth.service');
const validate = require('../middlewares/validator.middleware');

const router = express.Router();

/**
 * GET /auth
 * Request Login.
 */
router.get(
  '/',
  [
    body('email').notEmpty().trim().isEmail(),
    body('password').notEmpty().trim().isLength({ min: 8 }),
    validate,
  ],
  async (req, res) => {
    logger.info({ request: req.body.email });
    await login(req, res);
  },
);

/**
 * DELETE /auth
 * Request to logout
 */
router.delete('/', authenticate, async (req, res) => {
  logger.info({ request: req.session.userId });
  await logout(req, res);
});

/**
 * POST /auth/signup
 * Request to register a new user with the given information.
 */
router.post(
  '/signup',
  [
    body('email').notEmpty().trim().isEmail(),
    body('password').notEmpty().trim().isLength({ min: 8 }),
    body('displayName').notEmpty().isString().isLength({ min: 4, max: 32 }),
    body('avatarUrl').optional().isURL(),
    validate,
  ],
  async (req, res) => {
    logger.info({
      request: {
        email: req.body.email,
        displayName: req.body.displayName,
        avatarUrl: req.body.avatarUrl,
      },
    });

    logger.info({
      request: {
        email: req.body.email,
        displayName: req.body.displayName,
      },
    });
    await signup(req, res);
  },
);

/**
 * TODO : Complete the implementations of recovery progresses
 */

/**
 * GET /auth/recovery
 * Request to get a private key to access the recovery progress.
 */
router.get('/recovery', (req, res) => {

});

/**
 * PUT /auth/recovery
 * Send the private key issued by a request
 * and return 200 with a token if the key is valid
 */
router.put('/recovery', (req, res) => {

});

/**
 * POST /auth/recovery
 * Request to register a new password to an existant user account.
 */
router.post('/recovery', (req, res) => {

});

module.exports = router;
