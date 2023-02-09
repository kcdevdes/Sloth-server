const { createLogger, format, transports } = require('winston');
const WinstonDaily = require('winston-daily-rotate-file');

const {
  combine, timestamp, label, printf, colorize, json,
} = format;

const mFormat = printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

const logger = createLogger({
  format: combine(
    label({ label: 'sloth-backend-app' }),
    timestamp(),
    mFormat,
    json(),
  ),
  transports: [
    new WinstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/info',
      filename: '%DATE%.log',
      maxFiles: 30,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'warn',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/warn',
      filename: '%DATE%.warn.log',
      maxFiles: 30,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: 'logs/error',
      filename: '%DATE%.error.log',
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize({ all: true }),
      mFormat,
    ),
  }));
}

module.exports = logger;
