import angular from 'angular';

// angular modules
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'oclazyload';

// app page routing (w/ lazy loading)
import './main/main.routing';
import './about/about.routing';

// primary stylesheet
import './styles.scss';

// services, etc
import '../common/vfremoting/vfremoting';

// main module
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'oc.lazyLoad',
  'main.routing',
  'about.routing',
  'vfremoting',
])
.config(($urlRouterProvider, $stateProvider, $locationProvider) => {
  'ngInject';
  // set routing locations to use html5-mode URIs; i.e. /post/1
  $locationProvider.html5Mode(true).hashPrefix('!');

  // 404 forwarder
  $urlRouterProvider.otherwise(($injector, $location) => {
    const state = $injector.get('$state');
    state.go('404');
    return $location.path();
  });

  // handle 404s
  $stateProvider.state('404', {
    templateProvider: ($q) =>
      $q((resolve) => require.ensure([], () => resolve(require('./404.html')))),
  });
});
