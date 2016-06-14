import './';
import { apexPrefix } from '../../../.config.json';

export default angular.module('main.routing', ['main'])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider.state('main', {
      url: '/',
      parent: 'root',
      template: require('./main.html'),
      controller: 'MainController as vm',
    })
    /* Handle case where logging into a community
     * routes the user to "/apex/LandingPage"
     */
    .state('apex', {
      url: `/apex/${apexPrefix}`,
      redirectTo: 'main',
    });
  });
