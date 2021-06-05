// Initializes the `fibonacci` service on path `/fib`
const { Fibonacci } = require('./fibonacci.class');
const hooks = require('./fibonacci.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/fib', new Fibonacci(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('fib');

  service.hooks(hooks);
};
