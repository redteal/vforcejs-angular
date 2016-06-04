import MainController from './main.controller';
import MainService from './main.service';

export default angular.module('main', [])
  .service('MainService', MainService)
  .controller('MainController', MainController);
