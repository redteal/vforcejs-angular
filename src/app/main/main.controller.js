/**
 * MainController
 */
export default class MainController {
  constructor(MainService) {
    'ngInject';
    this.state = MainService;
  }

  next() {
    this.state.next();
  }

  reset() {
    this.state.reset();
  }

  get fib() {
    return this.state.fib;
  }
}
