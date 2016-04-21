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
    .when('/products', {
      templateUrl: 'templates/products/list.html',
      controller: 'ProductListController'
    })
    .when('/products/:id', {
      templateUrl: 'templates/products/edit.html',
      controller: 'ProductEditController'
    })
    .otherwise({redirectTo : '/clients'});
}]);





