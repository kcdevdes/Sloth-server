const { StatusCodes } = require('http-status-codes');
const logger = require('../middlewares/logger.middleware');
const Article = require('../models/article.model');
const User = require('../models/user.model');

exports.loadFeed = async (req, res) => {
  try {
    const myId = req.session.userId;

    const myUserInfo = await User.findOne({ userId: myId });

    if (!myUserInfo) {
      res.sendStatus(StatusCodes.FORBIDDEN);
      return;
    }

    const followingList = myUserInfo.following;

    if (followingList.length === 0) {
      res.json({
        feed: [],
      });
      return;
    }

    // find multiple documents from MongoDB by multiple queries as a list,
    // sort them in descending order based on creation time,
    // exclude the _id and __v fields from the results
    const articles = await Article
      .find({
        userId: {
          $in: followingList,
        },
      })
      .sort({ createdAt: -1 })
      .select('-_id -__v');

    res.json({
      feeds: articles,
    });
  } catch (error) {
    logger.error(`${error}`);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
