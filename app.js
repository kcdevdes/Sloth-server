const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('./middlewares/logger.middleware');
const { initDatabase } = require('./middlewares/mongoose.middleware');
const mainRouter = require('./routers/router');
const envConfig = require('./utilities/env.config');

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  },
}));
app.use(session({
  secret: envConfig.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `mongodb://${envConfig.MONGO_USERNAME}:${envConfig.MONGO_PASSWORD}@${envConfig.MONGO_URL}/${envConfig.MONGO_DB_NAME}`,
  }),
  cookie: { maxAge: (3.6e+6) * 1 }, // valid for an hour
}));

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initDatabase();

app.use('/api/v1', mainRouter);

module.exports = app;
