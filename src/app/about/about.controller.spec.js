import { name as moduleName } from './';

describe('Controller: AboutController', () => {
  beforeEach(angular.mock.module(moduleName));

  let bool = false;

  beforeEach(() => {
    bool = true;
  });

  it('should be true', () => {
    expect(bool).toEqual(true);
  });
});
