import VFRemotingService from './vfremoting.service';
import { apexPrefix } from '../../../.config.json';

export default angular.module('vfremoting', [])
  .constant('VFController', window[`${apexPrefix}Controller`])
  .service('VFRemotingService', VFRemotingService);
