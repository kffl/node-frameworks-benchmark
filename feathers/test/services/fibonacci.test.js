const app = require('../../src/app');

describe('\'fibonacci\' service', () => {
  it('registered the service', () => {
    const service = app.service('fib');
    expect(service).toBeTruthy();
  });
});
