var trackermanAdmin = angular.module("TrackermanAdmin");

var version = Math.floor(Math.random()*100000);

trackermanAdmin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/clients', {
      templateUrl: 'templates/clients/list.html?version=' + version,
      controller: 'ClientListController'
    })
    .when('/clients/:id', {
      templateUrl: 'templates/clients/edit.html?version=' + version,
      controller: 'ClientEditController'
    })
    .when('/products', {
      templateUrl: 'templates/products/list.html?version=' + version,
      controller: 'ProductListController'
    })
    .when('/products/:id', {
      templateUrl: 'templates/products/edit.html?version=' + version,
      controller: 'ProductEditController'
    })
    .when('/brands', {
      templateUrl: 'templates/brands/list.html?version=' + version,
      controller: 'BrandListController'
    })
    .when('/brands/:id', {
      templateUrl: 'templates/brands/edit.html?version=' + version,
      controller: 'BrandEditController'
    })    
    .otherwise({redirectTo : '/clients'});
}]);





