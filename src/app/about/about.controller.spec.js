import { expect } from 'chai';
import module from './about';

describe('Controller: AboutController', () => {
  // load the controller's module
  beforeEach(window.module(module.name));

  let AboutController;
  let scope;

  // Initialize the controller and a mock scope
  beforeEach(window.inject(($controller, $rootScope) => {
    scope = $rootScope.$new();
    AboutController = $controller('AboutController', {
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', () => {
    expect(AboutController.awesomeThings).to.have.length.of(3);
  });
});
