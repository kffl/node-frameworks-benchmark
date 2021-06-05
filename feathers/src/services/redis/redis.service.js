// Initializes the `redis` service on path `/redis`
const { Redis } = require('./redis.class');
const hooks = require('./redis.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/redis', new Redis(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('redis');

  service.hooks(hooks);
};
