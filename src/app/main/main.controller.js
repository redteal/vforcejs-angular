/**
 * MainController
 */
let VFRemotingService;

export default class MainController {
  constructor(_VFRemotingService_) {
    VFRemotingService = _VFRemotingService_;
  }

  get awesomeThings() {
    return [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
  }

  call() {
    VFRemotingService.myAction(true).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
  }
}
