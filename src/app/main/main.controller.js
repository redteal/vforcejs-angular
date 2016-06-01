/**
 * MainController
 */
export default class MainController {
  constructor($log, VFRemotingService) {
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
      this.$log.log(res);
    }).catch((err) => {
      this.$log.error(err);
    });
  }
}
