angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $powerbar) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.POWERBAR = $powerbar;
  $scope.clickPlug = function(plug,num){
    $powerbar.clickPlug(num).then(function(res){
      var obj = parseInt(res)
      $scope.POWERBAR.plugs[num-1].state = !obj;
      console.log("State Return: ",$scope.POWERBAR.plugs[num-1].state);
    })
  }
  $scope.powerOff = function(){
    $powerbar.powerOff().then(function(res){
      var obj = parseInt(res)
      console.log(obj)
      angular.forEach($scope.POWERBAR.plugs, function(val, key){
        console.log(key,val)
        $scope.POWERBAR.plugs[key].state = !res;
      })
    })
  }
})
