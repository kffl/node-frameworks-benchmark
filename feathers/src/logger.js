const { createLogger, format, transports } = require('winston');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(),
    format.simple(),
    format.errors({ stack: true })
  ),
  transports: [
    new transports.Console()
  ],
});

logger.stream = {
  write: function(message){
    logger.info(message);
  }
};

module.exports = logger;
