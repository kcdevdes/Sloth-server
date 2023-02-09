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

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);

module.exports = mainRouter;
