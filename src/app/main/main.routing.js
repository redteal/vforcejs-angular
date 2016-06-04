import './';

export default angular.module('main.routing', ['main'])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider.state('main', {
      url: '/',
      parent: 'root',
      template: require('./main.html'),
      controller: 'MainController as vm',
    });
  });
