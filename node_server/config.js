const config = {
    app: {
      port: 8000
    },
    db: {
      host: 'localhost',
      port: 27017,
      name: 'db',
      db_name: 'course_x_db',
      collection_learners: 'user_data',
      collection_widget: 'widget_settings',
      collection_emails: 'follow_up_emails',
      collection_SRL: 'SRL_answers',
      collection_log: 'interactions',
    }
   };
   
//module.exports = config;

//winston logger
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'logs/error.log', level: 'error', handleExceptions: true, maxsize: 5242880, // 5MB
                                                    maxFiles: 25, colorize: true }),
      new winston.transports.File({ filename: 'logs/combined.log' })
    ],
    exitOnError: false      // do not exit on handled exceptions

  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = {logger, config};