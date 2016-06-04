import { author } from '../../../package.json';

export default class FooterController {

  get date() {
    return new Date();
  }

  get author() {
    return author;
  }
}
