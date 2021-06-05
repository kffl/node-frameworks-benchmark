const app = require('../../src/app');

describe('\'validation\' service', () => {
  it('registered the service', () => {
    const service = app.service('validation');
    expect(service).toBeTruthy();
  });
});
