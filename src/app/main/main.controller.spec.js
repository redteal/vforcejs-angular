import { expect } from 'chai';
import module from './main';
import VFRemotingService from '../../common/vfremoting/vfremoting.mock';

describe('Controller: MainController', () => {
  // load the controller's module
  beforeEach(window.module(module.name));

  let MainController;
  let scope;

  // Initialize the controller and a mock scope
  beforeEach(window.inject(($controller, $rootScope) => {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope,
      VFRemotingService: new VFRemotingService(),
    });
  }));

  it('should attach a list of awesomeThings to the scope', () => {
    expect(MainController.awesomeThings).to.have.length.of(3);
  });
});
