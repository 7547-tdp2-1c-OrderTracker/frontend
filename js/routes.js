var trackermanAdmin = angular.module("TrackermanAdmin");

trackermanAdmin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/clients', {
      templateUrl: 'templates/list.html',
      controller: 'ClientListController'
    })
    .otherwise({redirectTo : '/clients'});
}]);





