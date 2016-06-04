/**
 * MainController
 */
export default class MainController {
  constructor(VFRemotingService, MainService) {
    'ngInject';
    this.VFRemotingService = VFRemotingService;
    this.state = MainService;
  }

  next() {
    const { a, b } = this.state;
    return this.VFRemotingService.nextFib({ a, b }).then((res) => {
      this.state.a = this.state.b;
      this.state.b = this.fib = res;
    }).catch((err) => {
      this.$log.error(err);
    });
  }

  reset() {
    this.state.reset();
  }

  get fib() { return this.state.fib; }
  set fib(value) { this.state.fib = value; }
}
