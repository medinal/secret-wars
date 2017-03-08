angular
  .module('droneStrikes', ['ngRoute', 'ngMap', 'ui.bootstrap', 'ngtweet'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider', '$qProvider'];
function config  ( $routeProvider,   $locationProvider,   $qProvider) {

  $routeProvider
    .when('/', {
      templateUrl: '/views/strikes.html',
      controllerAs: 'dronesIndexCtrl',
      controller: 'DronesIndexController'
    })
    .when('/details', {
      templateUrl: '/views/strike-show.html',
      controllerAs: 'dronesShowCtrl',
      controller: 'DronesShowController'
    })
    .when('/information', {
      templateUrl: '/views/information.html',
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
