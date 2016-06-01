let deferred;

export default angular.module('about.routing', [])
  .config(($urlRouterProvider, $stateProvider) => {
    'ngInject';
    $stateProvider.state('about', {
      url: '/about',
      templateProvider: () => deferred.promise,
      controller: 'AboutController as vm',
      resolve: {
        load: ($q, $ocLazyLoad) => {
          deferred = $q.defer();
          $q((resolve) => {
            require.ensure([], () => {
              const module = require('./about').default;
              $ocLazyLoad.load({ name: module.name });
              resolve(module);
              deferred.resolve(require('./about.html'));
            });
          });
        },
      },
    });
  });
