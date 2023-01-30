const express = require('express');

/**
 * main router that holds every sub-routers connecting to each endpoints
 */
const mainRouter = express.Router();

/**
 * sub-routers
 */
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter;
