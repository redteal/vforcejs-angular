/**
 * MainService
 */
export default class MainService {
  constructor($log, VFRemotingService) {
    'ngInject';
    this.$log = $log;
    this.vf = VFRemotingService;
    this.reset();
  }

  next() {
    const { a, b } = this;
    return this.vf.nextFib({ a, b }).then((res) => {
      this.a = this.b;
      this.b = this.fib = res;
    }).catch((err) => {
      this.$log.error(err);
    });
  }

  reset() {
    this.a = null;
    this.b = this.fib = 0;
  }
}
