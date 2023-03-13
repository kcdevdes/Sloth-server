const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const logger = require('./logger.middleware');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }
  logger.error({ request: req.body, error: errors.errors });
  res.sendStatus(StatusCodes.BAD_REQUEST);
};

module.exports = validate;
