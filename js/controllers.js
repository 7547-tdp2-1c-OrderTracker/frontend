var trackermanAdmin = angular.module("TrackermanAdmin");

var baseUrl = "https://trackerman-api.herokuapp.com";

var listController = function(pluralName) {
  return ["$scope", "$http", "$resource", function($scope, $http, $resource) {
    // le asigna acciones para q las pueda llamar desde el template
    var Entity = $resource(baseUrl + "/v1/"+pluralName+"/:id", {id:"@id"}, {save: {method: 'PUT'}});

    var updateList = function() {
      // todo: mover a un service
      $http.get(baseUrl + "/v1/" + pluralName)
        .then(function(response) {
          $scope.entities = response.data.results.map(wrapEntity);
        });
    };

    var wrapEntity = function(entity) {
      entity.delete = function() {
        Entity.delete({id: this.id}).$promise.then(function() {
          updateList();
        });
      };

      return entity;
    };

    updateList();
  }];
};

var editController = function(pluralName, options) {
  var beforeSave;

  options = options || {};
  beforeSave = options.beforeSave || function(x){return x; };

  return ["$scope", "$http", "$resource", "$routeParams", "$window", function($scope, $http, $resource, $routeParams, $window) {
    var Entity;

    if ($routeParams.id === "new") {
      Entity = $resource(baseUrl + "/v1/"+pluralName);
    } else {
      Entity = $resource(baseUrl + "/v1/"+pluralName+"/:id", {id:"@id"}, {save: {method: 'PUT'}});
    }

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

    if (options.relation) {
      for (var fieldName in options.relation) {
        var relData = options.relation[fieldName];
        processRelation(fieldName, relData);
      }
    }

    if ($routeParams.id !== "new") {
      Entity.get({id: $routeParams.id}).$promise.then(function(entity) {
        $scope.entity = entity;
      });
    } else {
      $scope.entity = new Entity();
    }

    $scope.save = function() {
      beforeSave($scope.entity).$save(function(entity) {
        $window.location.href = '#/' + pluralName;
      });
    };

    $scope.backUrl = "#" + pluralName;
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
trackermanAdmin.controller("ClientEditController", editController("clients"), {
  beforeSave: function(client) {
    client.seller_type = client.sellerType;

    return client;
  }
});

trackermanAdmin.controller("BrandListController", listController("brands"));
trackermanAdmin.controller("BrandEditController", editController("brands"));
