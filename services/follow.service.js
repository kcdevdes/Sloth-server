const { StatusCodes } = require('http-status-codes');
const logger = require('../middlewares/logger.middleware');
const User = require('../models/user.model');

exports.followUser = async (req, res) => {
  try {
    const myId = req.session.userId;
    const otherId = req.params.userId;

    if (!myId || !otherId || myId === otherId) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const myUserInfo = await User.findOne({ userId: myId });
    const otherUserInfo = await User.findOne({ userId: otherId });

    if (!myUserInfo || !otherUserInfo) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (myUserInfo.following.includes(otherId) && otherUserInfo.followers.includes(myId)) {
      res.sendStatus(StatusCodes.OK);
      return;
    }

    await myUserInfo.updateOne({ $push: { following: otherId } });
    await otherUserInfo.updateOne({ $push: { followers: myId } });

    res.sendStatus(StatusCodes.OK);
    return;
  } catch (error) {
    logger.error(error);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const myId = req.session.userId;
    const otherId = req.params.userId;

    if (!myId || !otherId || myId === otherId) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const myUserInfo = await User.findOne({ userId: myId });
    const otherUserInfo = await User.findOne({ userId: otherId });

    if (!myUserInfo || !otherUserInfo) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (!myUserInfo.following.includes(otherId) && !otherUserInfo.followers.includes(myId)) {
      res.sendStatus(StatusCodes.OK);
      return;
    }

    await myUserInfo.update({ $pull: { following: otherId } });
    await otherUserInfo.update({ $pull: { followers: myId } });

    res.sendStatus(StatusCodes.OK);
    return;
  } catch (error) {
    logger.error(error);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
