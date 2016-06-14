const { Configure } = require('./configure');

describe('Configure', () => {
  it('should instantiate', () => {
    const conf = new Configure();
    expect(conf).toEqual(conf);
  });
});
