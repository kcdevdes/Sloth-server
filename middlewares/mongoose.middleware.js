const mongoose = require('mongoose');
const envConfig = require('../utilities/env.config');
const logger = require('./logger.middleware');

function initDatabase() {
  mongoose.set('strictQuery', false);
  mongoose.connect(`mongodb://${envConfig.MONGO_USERNAME}:${envConfig.MONGO_PASSWORD}@${envConfig.MONGO_URL}/${envConfig.MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (error) => {
    logger.error(`DB Connection Error : ${error}`);
  });
  db.once('open', () => {
    logger.info('Connected to MongoDB');
  });
}

exports.initDatabase = initDatabase;
exports.db = mongoose;
