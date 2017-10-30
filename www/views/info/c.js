angular.module("info.ctrl", [])
.controller("infoCtrl", ["$scope", "$http", "$timeout", "Codes", "Ls", function($scope, $http, $timeout, Codes, Ls){
  //$scope.codes = Codes.all();
  //$scope.codes = Codes.get("泾");
  //console.log($scope.codes);
  $scope.codes = [
    {code: "101020100", name: "上海"}, {code: "101221401", name: "宣城"}, {code: "101221402", name: "泾县"}
  ];
  $scope.codes = Ls.load();
  $scope.times = 90000;
  $scope.times = Ls.load();
  $scope.data = [];
  var info = [];
  var getInfo = function(){
    info = []; // 初始化
    for(var i = 0; i < $scope.codes.length; i++){
      //promise
      $http.get("http://wthrcdn.etouch.cn/weather_mini", {
        params: {citykey: $scope.codes[i].code}
      }).then(function(resp){
        info.push(resp.data.data);
        //$scope.output();
        //console.log(resp);
      }, function(resp){
        //console.log(resp);
      });
    }
    $timeout(function(){
      $scope.output();
    }, 2000);
    $timeout(getInfo, $scope.times);
  };
  //监视器:跟踪codes 城市地区列表变化 更新气象信息
  $scope.$watch("codes", function(){
    getInfo();
  }, true);
  //getInfo();
  $scope.output = function(){
    $scope.codes = Ls.load();
    $scope.data = [
      //{gm: '', wd:'', wk:[{}, {}, {}, {}, {}]}
    ];
    for(var i = 0; i < info.length; i++){
      var m = (new Date()).getMonth() + 1, d=0;
      $scope.data.push({
        city: info[i].city,
        gm: info[i].ganmao,
        wd: info[i].wendu,
        wk: []
      });
      var cast = info[i].forecast;
      for(var j = 0; j < cast.length; j++){
        var s = cast[j].date.split("日");
        if(d == 0) d = s[0];
        if(s[0] < d) {
          if(++m > 12) m = 1;  //下一个月开始
        }
        var h = (cast[j].high.split(" "))[1].split("℃")[0];
        var l = (cast[j].low.split(" "))[1];
        $scope.data[i].wk.push({
          week: s[1],
          day: m + "月" + s[0] + "日",
          tmp: h + "/" + l,
          fx: cast[j].fengxiang,
          fl: cast[j].fengli,
          type: cast[j].type
        });
      }
    }
  };
  $scope.data.sort(function(a, b){
    return a.city > b.city;
  });
}]);
