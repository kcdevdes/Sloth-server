const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');

/**
 * Returns a user's profile
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getUserProfile = async (req, res) => {
  try {
    const reqUserId = req.params.userId;

    if (!reqUserId) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const user = await User.findOne({ userId: reqUserId });

    if (!user) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const payload = {
      userId: user.userId,
      displayName: user.displayName,
      email: user.email,
      createdAt: user.createdAt,
      avatarUrl: user.avatarUrl,
    };

    res.json(payload);
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Updates a user's profile.
 * Requested fields are all optional. You can request the update with at least one field
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const reqUserId = req.params.userId;
    // gets all fields that the user requests to update
    const requestedKeys = Object.keys(req.body);

    if (!reqUserId || requestedKeys.length === 0) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (reqUserId !== req.session.userId) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    const user = await User.findOne({ userId: reqUserId });

    if (!user) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    // updates each field
    requestedKeys.forEach((key) => {
      user[key] = req.body[key];
    });

    user.save((error) => {
      if (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        return;
      }

      res.sendStatus(StatusCodes.OK);
    });
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Requests to update a user's password.
 * Required to submit the current password and a new password
 * at the same time. Otherwise, returns HTTP401[UNAUTHORIZED]
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.updateUserPassword = async (req, res) => {
  try {
    const reqUserId = req.params.userId;
    const { currentPassword, newPassword } = req.body;

    if (!reqUserId || !currentPassword || !newPassword) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (reqUserId !== req.session.userId) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    const user = await User.findOne({ userId: reqUserId });
    if (!user) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    user.password = newPassword;
    user.save((error) => {
      if (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        return;
      }

      res.sendStatus(StatusCodes.ACCEPTED);
    });
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
