const app = require('../../src/app');

describe('\'staticService\' service', () => {
  it('registered the service', () => {
    const service = app.service('static');
    expect(service).toBeTruthy();
  });
});
