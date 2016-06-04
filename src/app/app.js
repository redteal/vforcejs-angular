import './ext';
import './global';
import './main/main.routing';
import './about/about.routing';

// common modules
import '../common/vfremoting';

// stylesheet entry
import './styles.scss';

// main module
angular.module('app', [
  'ext',
  'global',
  'main.routing',
  'about.routing',
])
.config((
  $urlRouterProvider,
  $stateProvider,
  $locationProvider
) => {
  'ngInject';
  // set routing locations to use html5-mode URIs; i.e. /post/1
  $locationProvider.html5Mode(true).hashPrefix('!');

  // base layout
  $stateProvider.state('root', {
    url: '',
    abstract: true,
    views: {
      header: {
        template: require('./header/header.html'),
        controller: 'HeaderController as vm',
      },
      root: {
        template: '<ui-view/>',
      },
      footer: {
        template: require('./footer/footer.jade'),
        controller: 'FooterController as vm',
      },
    },
  })
  .state('404', {
    parent: 'root',
    template: require('./404.html'),
  });

  // 404 forwarder
  $urlRouterProvider.otherwise(($injector) => {
    $injector.invoke(($state) =>
      $state.go('404', {}, { location: false }));
  });
});
