import module from './vfremoting';

describe('Service: VFRemotingService', () => {
  // load the service's module
  beforeEach(angular.mock.module(module.name));

  // instantiate service
  let instance;

  beforeEach(angular.mock.inject((VFRemotingService) => {
    instance = VFRemotingService;
  }));

  it('should be instantiated', () => {
    expect(instance).to.be.ok;
  });
});
