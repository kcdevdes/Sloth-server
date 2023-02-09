// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
  SESSION_KEY: process.env.SESSION_KEY,
};
