import { appTitle } from '../../../.config.json';
import { homepage } from '../../../package.json';

/**
 * HeaderController
 */
export default class HeaderController {

  get links() {
    return [{
      name: 'main',
      label: 'Main',
    }, {
      name: 'about',
      label: 'About',
    }];
  }

  get homepage() {
    return homepage;
  }

  get appTitle() {
    return appTitle;
  }
}
