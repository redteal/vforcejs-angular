/* eslint-disable no-console */
/**
 * MainController
 */
export default class MainController {
  constructor($log, VFRemotingService) {
    'ngInject';
    this.$log = $log;
    this.VFRemotingService = VFRemotingService;
  }

  get things() {
    return [
      'Salesforce',
      'Webpack',
      'AngularJS',
      'Karma',
    ];
  }

  call() {
    this.VFRemotingService.myAction(true).then((res) => {
      $log.log(res);
    }).catch((err) => {
      $log.error(err);
    });
  }
}
