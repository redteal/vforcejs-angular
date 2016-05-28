import angular from 'angular';

let deferred;

export default angular.module('main.routing', [])
  .config(($urlRouterProvider, $stateProvider) => {
    'ngInject';
    $stateProvider.state('main', {
      url: '/',
      templateProvider: () => deferred.promise,
      controller: 'MainController as vm',
      resolve: {
        load: ($q, $ocLazyLoad) => {
          deferred = $q.defer();
          $q((resolve) => {
            require.ensure([], () => {
              const module = require('./main').default;
              $ocLazyLoad.load({ name: module.name });
              resolve(module);
              deferred.resolve(require('./main.html'));
            });
          });
        },
      },
    });
  });
