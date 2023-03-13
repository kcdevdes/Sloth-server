const express = require('express');

/**
 * the main router that holds every sub-router
 * connecting to each endpoint
 */
const mainRouter = express.Router();

/**
 * sub-routers
 */
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const articleRouter = require('./article.router');
const likeRouter = require('./like.router');

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/article', articleRouter);
mainRouter.use('/like', likeRouter);

module.exports = mainRouter;
