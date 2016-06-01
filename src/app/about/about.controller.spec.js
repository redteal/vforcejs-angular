import module from './about';

describe('Controller: AboutController', () => {
  // load the controller's module
  beforeEach(angular.mock.module(module.name));

  let AboutController;
  let scope;

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(($controller, $rootScope) => {
    scope = $rootScope.$new();
    AboutController = $controller('AboutController', {
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('should attach a list of things to the scope', () => {
    expect(AboutController.things).to.have.length.of(4);
  });
});
