angular
  .module('droneStrikes')
  .controller('DronesIndexController', DronesIndexController)

DronesIndexController.$inject = ['$http', '$sce', 'NgMap'];
function DronesIndexController(   $http , $sce,    NgMap){

  NgMap.getMap().then(function(map) {
  });

  var db = "http://api.dronestre.am/data";

  var vm = this;

  vm.strikes = [];

  vm.locations = [];

  vm.children = 0;

  vm.civilians = 0;

  vm.sort = function(array){
    for (i=0; i<vm.strikes.length; i++){
      if (vm.strikes[i].lat.length != 0 || vm.strikes[i].lon.length !=0){
        vm.locations.push([vm.strikes[i].lat, vm.strikes[i].lon])
      }
    }
  }

  vm.childrenCount =  function(){
    for (i=0; i<vm.strikes.length; i++){
      if (!isNaN(parseInt(vm.strikes[i].children)))
      vm.children += parseInt(vm.strikes[i].children);
    }
  };

  vm.civilianCount =  function(){
    for (i=0; i<vm.strikes.length; i++){
      if (!isNaN(parseInt(vm.strikes[i].civilians)))
      vm.civilians += parseInt(vm.strikes[i].civilians);
    }
  };

  $http({
    url: $sce.trustAsResourceUrl(db),
    method: 'jsonp'
  }).then(
    function success(response){
      vm.strikes = response.data.strike;
      vm.sort(vm.strikes);
      vm.childrenCount();
      vm.civilianCount();
    },
    function fail(response){
      console.log(response);
    }
  );

}
