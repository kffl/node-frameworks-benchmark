// Initializes the `errorService` service on path `/error`
const { ErrorService } = require('./error-service.class');
const hooks = require('./error-service.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/error', new ErrorService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('error');

  service.hooks(hooks);
};
