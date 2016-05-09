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
    .when('/sellers', {
      templateUrl: 'templates/sellers/list.html?version=' + version,
      controller: 'SellerListController'
    })
    .when('/sellers/:id', {
      templateUrl: 'templates/sellers/edit.html?version=' + version,
      controller: 'SellerEditController'
    })    
    .when('/promotions', {
      templateUrl: 'templates/promotions/list.html?version=' + version,
      controller: 'PromotionListController'
    })
    .when('/promotions/:id', {
      templateUrl: 'templates/promotions/edit.html?version=' + version,
      controller: 'PromotionEditController'
    })    
    .otherwise({redirectTo : '/clients'});
}]);





