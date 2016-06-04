import { name as moduleName } from './';

describe('Service: VFRemotingService', () => {
  beforeEach(angular.mock.module(moduleName));

  let bool = false;

  beforeEach(() => {
    bool = true;
  });

  it('should be true', () => {
    expect(bool).toEqual(true);
  });
});
