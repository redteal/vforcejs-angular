import './';

export default angular.module('about.routing', ['about'])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider.state('about', {
      url: '/about',
      parent: 'root',
      template: require('./about.html'),
      controller: 'AboutController as vm',
    });
  });
