/**
 * MainController
 */
export default class MainController {

  constructor($scope, $q, $log, VFRemotingService) {
    'ngInject';
    this.$scope = $scope;
    this.$q = $q;
    this.$log = $log;
    this.VFRemotingService = VFRemotingService;

    this.$scope.count = 0;
  }

  call() {
    return this.VFRemotingService.myAction(true).then((res) => {
      this.$log.log(res);
      this.$scope.count += 1;
      this.$scope.$apply();
    }).catch((err) => {
      this.$log.error(err);
    });
  }

  get things() {
    return [
      'Salesforce',
      'Webpack',
      'AngularJS',
      'Karma',
    ];
  }
}
