(function(){

  'use strict'

  angular.module('LunchCheck', [])
          .controller('LunchCheckController', LunchCheckController)

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope){
      $scope.lunchItems = ""
      $scope.successMessage = ""
      $scope.errorMessage = ""
      $scope.class = ""
      $scope.checkIfTooMuch = function(){
          var lunchItemsString = $scope.lunchItems
          if(lunchItemsString==""){
            $scope.class = "error"
            $scope.message = "Please enter data first"
            return
          }
          var countOfLunchItems = 0
          var lunchItemsArray = lunchItemsString.split(",")
          lunchItemsArray.forEach(function(item, index){
              if(item.trim()!="")
                  countOfLunchItems++
          })
          if(countOfLunchItems>3){
              $scope.class = "success"
              $scope.message = "Too much!"
          }else {
              $scope.class = "success"
              $scope.message = "Enjoy"
          }
      }
  }

})()
