import angular from 'angular';
import { apexPrefix } from '../../../.config.json';

import 'core-js/fn/object/entries';
import 'core-js/fn/promise';

class VFRemotingService {}

const ctrl = window[`${apexPrefix}Controller`];
if (ctrl) {
  for (const [key, fn] of Object.entries(ctrl)) {
    VFRemotingService.prototype[key] = (...args) =>
      new Promise((resolve, reject) => {
        args.push((res, event) => {
          try {
            if (!event.status) {
              reject(event);
              return;
            }
            resolve(res);
          } catch (e) {
            reject(e);
          }
        });
        fn.apply(window, args);
      });
  }
}

export default angular.module('vfremoting', [])
  .service('VFRemotingService', VFRemotingService);
