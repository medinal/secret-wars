angular
  .module('droneStrikes', ['ngRoute', 'ngMap', 'ui.bootstrap', 'ngtweet'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider', '$qProvider'];
function config  ( $routeProvider,   $locationProvider,   $qProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/templates/strikes.html',
      controllerAs: 'dronesIndexCtrl',
      controller: 'DronesIndexController'
    })
    .when('/details', {
      templateUrl: '/templates/strike-show.html',
      controllerAs: 'dronesShowCtrl',
      controller: 'DronesShowController'
    })
    .when('/information', {
      templateUrl: '/templates/information.html',
      controllerAs: 'infoCtrl',
      controller: 'InformationController'
    })
    .otherwise('/')

  $locationProvider.html5Mode({
    enabled: true,
    requireBase:false
  });

  $qProvider.errorOnUnhandledRejections(false);

}
