const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');
const logger = require('../middlewares/logger.middleware');

/**
 * Attempts to login with the given values
 * Object `req` is required to possess `email` and `password` fields in its body
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    req.session.authenticated = true;
    req.session.userId = user.userId;

    res.json({
      email: user.email,
      displayName: user.displayName,
      createdAt: user.createdAt,
      userId: user.userId,
    });
  } catch (error) {
    logger.error(`${error}`);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Attempts to destroy the session that is used to validate the user is logged in
 * Object `req` is required to possess `session` property
 * @param {*} req
 * @param {*} res
 */
exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
      }

      res.sendStatus(StatusCodes.OK);
    });
  } catch (error) {
    logger.error(`${error}`);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Attempts to create a new user with the given value
 * Object `req` is required to possess `email`, `password`, and `displayName` in its body
 * @param {*} req
 * @param {*} res
 */
exports.signup = async (req, res) => {
  /**
   * TODO: change `avatarUrl` into a default url.
   */
  try {
    const {
      email, password, displayName, avatarUrl,
    } = req.body;
    const newUser = new User({
      email,
      password,
      displayName,
      createdAt: Date.now(),
      userId: uuidv4(),
      avatarUrl,
      following: [],
      followers: [],
    });

    newUser.save((err, user) => {
      if (err) {
        logger.error(`${err}`);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        return;
      }
      res.json({
        email: user.email,
        displayName: user.displayName,
        userId: user.userId,
        avatarUrl: user.avatarUrl,
      });
    });
  } catch (error) {
    logger.error(`${error}`);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Middleware to check if the user is valid, based on the session storage
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.authenticate = (req, res, next) => {
  try {
    // acceptable when `authenticated` is true and `userId` has a value
    if (!req.session.authenticated) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    next();
  } catch (error) {
    logger.error(`${error}`);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
