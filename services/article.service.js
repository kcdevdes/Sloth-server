const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const Article = require('../models/article.model');
const logger = require('../middlewares/logger.middleware');

exports.uploadArticle = async (req, res) => {
  try {
    const newArticle = new Article({
      userId: req.session.userId,
      articleId: uuidv4(),
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      modifiedAt: new Date(),
      likes: 0,
    });

    newArticle.save((err, article) => {
      if (err) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
      }

      res.json({
        articleId: article.articleId,
        title: article.title,
        content: article.content,
        createdAt: article.createdAt,
      });
    });
  } catch (error) {
    logger.error({});
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const articleSearch = await Article.findOneAndUpdate(
      { articleId: req.params.articleId },
      { title: req.body.title, content: req.body.content },
    );

    if (!articleSearch) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    res.sendStatus(StatusCodes.ACCEPTED);
    return;
  } catch (error) {
    logger.error({ error: { error } });
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.searchArticle = async (req, res) => {
  try {
    const reqArticleId = req.params.articleId;

    if (!reqArticleId) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const articleSearchResult = await Article.findOne({
      articleId: reqArticleId,
    });

    if (!articleSearchResult) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    res.json({
      userId: articleSearchResult.userId,
      articleId: articleSearchResult.articleId,
      title: articleSearchResult.title,
      content: articleSearchResult.content,
      createdAt: articleSearchResult.createdAt,
      modifiedAt: articleSearchResult.modifiedAt,
      likes: articleSearchResult.likes,
    });
  } catch (error) {
    logger.error({ error });
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};