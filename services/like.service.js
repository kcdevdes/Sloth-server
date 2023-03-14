const { StatusCodes } = require('http-status-codes');
const Article = require('../models/article.model');
const logger = require('../middlewares/logger.middleware');

/**
 * Checkes if the user's id does already exist in the `likes` array in MongoDB. If so,
 * the id will be pushed into the array. Otherwise, it will be poped out from the array.
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.postNewLike = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { userId } = req.session;
    if (!articleId) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const articleSearch = await Article.findOne({ articleId });
    if (!articleSearch) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    logger.info(articleSearch);

    // if article contains the user id, it removes the id from the `likes` array
    if (articleSearch.likes.includes(userId)) {
      articleSearch.updateOne({ $pull: { likes: userId } }, (error, result) => {
        if (error) {
          logger.error(error);
          res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
          return;
        }
        res.sendStatus(StatusCodes.ACCEPTED);
      });
      // otherwise, it pushes the user id into the `likes` array
    } else {
      articleSearch.updateOne({ $push: { likes: userId } }, (error, result) => {
        if (error) {
          logger.error(error);
          res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
          return;
        }
        res.sendStatus(StatusCodes.ACCEPTED);
      });
    }
  } catch (error) {
    logger.error({ error });
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
