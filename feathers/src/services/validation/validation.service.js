// Initializes the `validation` service on path `/validation`
const { Validation } = require('./validation.class');
const hooks = require('./validation.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/validation', new Validation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('validation');

  service.hooks(hooks);
};
