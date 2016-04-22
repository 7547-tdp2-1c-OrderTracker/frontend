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

var editController = function(pluralName, options) {
  options = options || {};
  return ["$scope", "$http", "$resource", "$routeParams", "$window", function($scope, $http, $resource, $routeParams, $window) {
    var Entity = $resource(baseUrl + "/v1/"+pluralName+"/:id", {id:"@id"}, {save: {method: 'PUT'}});

    var processRelation = function(fieldName, relData) {
      $http.get(baseUrl + "/v1/" + relData.pluralName + "?limit=999999").then(function(response) {
        $scope.relation = $scope.relation || {};
        $scope.relation[relData.pluralName] = response.data.results.map(function(entity) {
          return {
            id: entity.id,
            name: entity[relData.field]
          };
        });
      });
    };

    $scope.brand_id=2;

    if (options.relation) {
      for (var fieldName in options.relation) {
        var relData = options.relation[fieldName];
        processRelation(fieldName, relData);
      }
    }

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
trackermanAdmin.controller("ProductEditController", editController("products", {
  relation: {
    brand_id: {
      pluralName: 'brands',
      field: 'name'
    }
  }
}));

trackermanAdmin.controller("ClientListController", listController("clients"));
trackermanAdmin.controller("ClientEditController", editController("clients"));
