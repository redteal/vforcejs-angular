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
    this.reset();
  }

  next() {
    return this.VFRemotingService.nextFib(this.prev).then((res) => {
      this.$log.log(res);
      this.prev = { a: this.prev.b, b: res };
      this.fib = res;
      this.$scope.fib = this.fib;

      /* Because we're updating $scope via a
       * promise, we must now call $apply() */
      this.$scope.$apply();
    }).catch((err) => {
      this.$log.error(err);
    });
  }

  reset() {
    this.prev = { a: null, b: 0 };
    this.fib = 0;
    this.$scope.fib = this.fib;
  }
}
