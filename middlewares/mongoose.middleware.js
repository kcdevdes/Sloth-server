const mongoose = require('mongoose');
const logger = require('./logger.middleware');

function initDatabase() {
  mongoose.set('strictQuery', false);
  mongoose.connect('mongodb://localhost:27017/sloth-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', () => {
    logger.error('connection error:');
  });
  db.once('open', () => {
    logger.info('Connected to MongoDB');
  });
}

exports.initDatabase = initDatabase;
exports.db = mongoose.connection;
