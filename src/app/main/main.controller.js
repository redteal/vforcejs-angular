/**
 * MainController
 */
export default class MainController {
  constructor(VFRemotingService) {
    'ngInject';
    this.VFRemotingService = VFRemotingService;
  }

  get awesomeThings() {
    return [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
  }

  call() {
    this.VFRemotingService.myAction(true).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
  }
}
