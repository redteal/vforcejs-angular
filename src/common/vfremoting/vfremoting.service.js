import promisify from '../../lib/promisify';

class VFRemotingService {
  constructor($window, VFController) {
    'ngInject';
    if (!VFController) {
      return;
    }
    if (VFController) {
      for (const [key, fn] of Object.entries(VFController)) {
        this[key] = promisify($window, fn);
      }
    }
  }
}

export default VFRemotingService;
