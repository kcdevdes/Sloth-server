// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  JWT_KEY: process.env.JWT_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
  SESSION_KEY: process.env.SESSION_KEY,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  PRODUCTION_LEVEL: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
