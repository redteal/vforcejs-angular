import promisify from '../../lib/promisify';

class VFRemotingService {
  constructor($window, VFControllerName) {
    'ngInject';
    if (!VFControllerName) {
      return;
    }
    const VFController = $window[VFControllerName];
    if (VFController) {
      for (const [key, fn] of Object.entries(VFController)) {
        this[key] = promisify($window, fn);
      }
    }
  }
}

export default VFRemotingService;
