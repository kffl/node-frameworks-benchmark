const app = require('../../src/app');

describe('\'errorService\' service', () => {
  it('registered the service', () => {
    const service = app.service('error');
    expect(service).toBeTruthy();
  });
});
