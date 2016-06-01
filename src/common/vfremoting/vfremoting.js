import VFRemotingService from './vfremoting.service';
import { apexPrefix } from '../../../.config.json';

export default angular.module('vfremoting', [])
  .constant('VFControllerName', `${apexPrefix}Controller`)
  .service('VFRemotingService', VFRemotingService);
