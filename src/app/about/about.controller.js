import kitten from '../../assets/img/kitten.jpg';
/**
 * AboutController
 */
export default class AboutController {
  constructor($scope) {
    'ngInject';
    $scope.kitten = kitten;
  }

  get things() {
    return [
      'Salesforce',
      'Webpack',
      'AngularJS',
      'Karma',
    ];
  }
}
