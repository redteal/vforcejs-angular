import kitten from '../../assets/img/kitten.jpg';
/**
 * AboutController
 */
export default class AboutController {
  constructor() {
    this.kitten = kitten;
    this.things = [
      'Salesforce',
      'Webpack',
      'AngularJS',
      'Karma',
    ];
  }
}
