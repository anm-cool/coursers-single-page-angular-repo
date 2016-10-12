(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .provider('ShoppingListCheckOffService', ShoppingListCheckOffProvider)
         .config(ShoppingListConfig)

  ShoppingListConfig.$inject = ['ShoppingListCheckOffServiceProvider']
  function ShoppingListConfig(ShoppingListCheckOffServiceProvider){
    ShoppingListCheckOffServiceProvider.defaults.items =
          [{name:'milk', quantity:'10'}, {name:'soda', quantity:'11'},
            {name:'water', quantity:'12'}, {name:'cookie', quantity:'13'},
            {name:'candy', quantity:'14'}]
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService']
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this
    toBuy.list = ShoppingListCheckOffService.getToBuyList()
    toBuy.transferItem = function(index){
      ShoppingListCheckOffService.transferItemFromBuyListToBoughtList(index)
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this
    bought.list = ShoppingListCheckOffService.getBoughtList()
  }

  function itemListDataService(items){
    var service = this
    var toBuyList = items, boughtList = []

    service.transferItemFromBuyListToBoughtList = function(index){
        boughtList.push(toBuyList[index])
        toBuyList.splice(index, 1)
    }

    service.getToBuyList = function(){
      return toBuyList
    }

    service.getBoughtList = function(){
      return boughtList
    }
  }

  function ShoppingListCheckOffProvider(){
      var provider = this

      provider.defaults = {
        items: []
      }

      provider.$get = function(){
        return new itemListDataService(provider.defaults.items)
      }
  }

})()
