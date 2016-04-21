var trackermanAdmin = angular.module("TrackermanAdmin");

var baseUrl = "https://trackerman-api.herokuapp.com";

var listController = function(pluralName) {
  return ["$scope", "$http", function($scope, $http) {
    // le asigna acciones para q las pueda llamar desde el template
    var wrapEntity = function(entity) {
      entity.delete = function() {
        alert("No implementado :P");
      };

      entity.edit = function() {
        alert("No implementado :P");
      };

      return entity;
    };
    // todo: mover a un service
    $http.get(baseUrl + "/v1/" + pluralName)
      .then(function(response) {
        $scope.entities = response.data.results.map(wrapEntity);
      });
  }];
};

var editController = function(pluralName) {
  return ["$scope", "$resource", "$routeParams", "$window", function($scope, $resource, $routeParams, $window) {
    var Entity = $resource(baseUrl + "/v1/"+pluralName+"/:id", {id:"@id"}, {save: {method: 'PUT'}});

    Entity.get({id: $routeParams.id}).$promise.then(function(entity) {
      $scope.entity = entity;
    });

    $scope.save = function() {
      $scope.entity.$save(function(entity) {
        $window.location.href = '#/' + pluralName;
      });
    };

    $scope.backUrl = "/#" + pluralName;
  }];
};

trackermanAdmin.controller("ProductListController", listController("products"));
trackermanAdmin.controller("ProductEditController", editController("products"));

trackermanAdmin.controller("ClientListController", listController("clients"));
trackermanAdmin.controller("ClientEditController", editController("clients"));
