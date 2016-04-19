var trackermanAdmin = angular.module("TrackermanAdmin");

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
  $http.get("https://trackerman-api.herokuapp.com/v1/clients")
    .then(function(response) {
      $scope.clients = response.data.results.map(wrapClient);
    });
}]);