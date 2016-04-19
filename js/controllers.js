var trackermanAdmin = angular.module("TrackermanAdmin");

var baseUrl = "https://trackerman-api.herokuapp.com";

trackermanAdmin.controller("ClientListController", ["$scope", "$http", function($scope, $http) {
  // le asigna acciones al client para q las pueda llamar desde el template
  var wrapClient = function(client) {
    client.delete = function() {
      alert("No implementado :P");
    };

    client.edit = function() {
      alert("No implementado :P");
    };

    return client;
  };
  // todo: mover a un service
  $http.get(baseUrl + "/v1/clients")
    .then(function(response) {
      $scope.clients = response.data.results.map(wrapClient);
    });
}]);

trackermanAdmin.controller("ClientEditController", ["$scope", "$resource", "$routeParams", "$window", function($scope, $resource, $routeParams, $window) {
  var Client = $resource(baseUrl + "/v1/clients/:clientId", {clientId:"@id"}, {save: {method: 'PUT'}});

  Client.get({clientId: $routeParams.id}).$promise.then(function(client) {
    $scope.client = client;
  });

  $scope.clientSave = function() {
    $scope.client.$save(function(client) {
      $window.location.href = '#/clients';
    });
  };
}]);