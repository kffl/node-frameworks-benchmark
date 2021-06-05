// Initializes the `staticService` service on path `/static`
const { StaticService } = require('./static-service.class');
const hooks = require('./static-service.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/static', new StaticService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('static');

  service.hooks(hooks);
};
