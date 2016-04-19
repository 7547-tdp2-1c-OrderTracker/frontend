var trackermanAdmin = angular.module("TrackermanAdmin");

trackermanAdmin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/clients', {
      templateUrl: 'templates/clients/list.html',
      controller: 'ClientListController'
    })
    .when('/clients/:id', {
      templateUrl: 'templates/clients/edit.html',
      controller: 'ClientEditController'
    })
    .otherwise({redirectTo : '/clients'});
}]);





