const app = require('../../src/app');

describe('\'redis\' service', () => {
  it('registered the service', () => {
    const service = app.service('redis');
    expect(service).toBeTruthy();
  });
});
