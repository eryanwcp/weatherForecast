angular.module("list.ctrl", [])
  .controller("listCtrl", ["$scope", "Codes", "Ls", function($scope, Codes, Ls){
    $scope.data = Ls.load();
    $scope.move = function(index, d){
      var dest = index + d;
      var max = $scope.data.length - 1;
      if(dest < 0 || dest > max) {
        return;
      }
      var tmp = $scope.data[dest];
      $scope.data[dest] = $scope.data[index];
      $scope.data[index] = tmp;
      Ls.save($scope.data);
    };
    $scope.remove = function(index){
      $scope.data.splice(index, 1);
      Ls.save($scope.data);
    };
    $scope.find = {
      keyword: ''
    };
    $scope.getList = function(){
      $scope.lists = Codes.get($scope.find.keyword);
    };
    $scope.add =function(index){
      $scope.data.push($scope.lists[index]);
      Ls.save($scope.data);
      $scope.find.keyword = "";
      $scope.lists = [];
    };
  }]);
