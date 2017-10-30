// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'services', 'info.ctrl', 'list.ctrl', 'set.ctrl'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state("info", {
        url: "/info",
        views: {
          "content": {
            templateUrl: "views/info/p.html",
            controller: "infoCtrl"
          }
        }
      })
      .state("list", {
        url: "/list",
        views: {
          "content": {
            templateUrl: "views/list/p.html",
            controller: "listCtrl"
          }
        }
      })
      .state("set", {
        url: "/set",
        views: {
          "content": {
            templateUrl: "views/set/p.html",
            controller: "setCtrl"
          }
        }
      });
    $urlRouterProvider.otherwise("/info");
  })
  .filter("wicon", function(){
    var icons = {
      "晴": "wi-day-sunny",
      "阴": "wi-night-cloudy",
      "多云": "wi-cloudy",
      "小雨": "wi-sleet",
      "小到中雨": "wi-hail",
      "中雨": "wi-showers",
      "中到大雨": "wi-rain-wind",
      "大雨": "wi-rain-mix",
      "阵雨": "wi-rain",
      "雷阵雨": "wi-storm-showers"
    };
    return function(type){
      return icons[type];
    };
  });

