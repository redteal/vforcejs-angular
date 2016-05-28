import { expect } from 'chai';
import module from './vfremoting';

describe('Service: VFRemotingService', () => {
  // load the service's module
  beforeEach(window.module(module.name));

  // instantiate service
  let instance;

  beforeEach(window.inject((VFRemotingService) => {
    instance = VFRemotingService;
  }));

  it('should be instantiated', () => {
    expect(instance).to.be.ok;
  });
});
