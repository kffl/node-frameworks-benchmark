const errorService = require('./error-service/error-service.service.js');
const fibonacci = require('./fibonacci/fibonacci.service.js');
const validation = require('./validation/validation.service.js');
const staticService = require('./static-service/static-service.service.js');
const redis = require('./redis/redis.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(errorService);
  app.configure(fibonacci);
  app.configure(validation);
  app.configure(staticService);
  app.configure(redis);
};
