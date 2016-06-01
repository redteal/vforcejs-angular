import module from './main';
import VFRemotingService from '../../common/vfremoting/vfremoting.mock';

describe('Controller: MainController', () => {
  // load the controller's module
  beforeEach(angular.mock.module(module.name));

  let MainController;
  let scope;

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(($controller, $rootScope) => {
    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope,
      VFRemotingService: new VFRemotingService(),
    });
  }));

  it('should attach a list of things to the scope', () => {
    expect(MainController.things).to.have.length.of(4);
  });
});
