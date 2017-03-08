angular
  .module('droneStrikes')
  .controller('DronesShowController', DronesShowController)
  .filter('roundup', function() {
      return function(input) {
        return Math.ceil(input);
      };
    });

DronesShowController.$inject = ['$http', '$sce', 'NgMap', '$scope', '$uibModal'];
function DronesShowController(   $http , $sce,    NgMap,   $scope,   $uibModal){

  // creates the map instance
  NgMap.getMap().then(function(map) {
  });

  var db = "http://api.dronestre.am/data";

  var vm = this;

  // all strikes
  vm.strikes = [];
  // only the strikes that will be displayed at any given moment
  vm.display = [];
  // only the currently selected strike in the modal
  vm.current = {};

  // page counter for pagination
  vm.currentPage = 0;

  // sorting variables
  vm.sortType = 'date';
  vm.sortReverse = false;
  vm.searchFilter = '';

  // date parsing for the date range sort
  vm.startDate = new Date(moment('2002-11-01').format());
  vm.endDate = new Date(moment().format());

  // pagination controls
  vm.next = function(){
    vm.currentPage++;
  };
  vm.previous = function(){
    vm.currentPage--;
  };

  // sorts strikes by the date range
  vm.reSort = function(){
    vm.display = [];
    vm.strikes.forEach(function(strike){
      if (vm.endDate==null){
        vm.endDate = new Date(moment().format());
      };
      if (vm.startDate==null){
        vm.startDate = new Date(moment('2002-11-01').format());
      };
      if(strike.date>vm.startDate.toISOString() && strike.date<vm.endDate.toISOString()){
        vm.display.push(strike);
      };
    });
  }

  // parses the data so that the number values are interpreted as integers rather than strings or NaN
  vm.dataFilter = function(data){
    data.forEach(function(strike){
      if (!isNaN(parseInt(strike.deaths_min))){
        strike.deaths_min = parseInt(strike.deaths_min);
      };
      if (!isNaN(parseInt(strike.civilians))){
        strike.civilians = parseInt(strike.civilians);
      };
      if (!isNaN(parseInt(strike.deaths_max))){
        strike.deaths_max = parseInt(strike.deaths_max);
      };
      if (!isNaN(parseInt(strike.deaths))){
        strike.deaths = parseInt(strike.deaths);
      };
      if (!isNaN(parseInt(strike.children))){
        strike.children = parseInt(strike.children);
      };
      if (!isNaN(parseInt(strike.injuries))){
        strike.injuries = parseInt(strike.injuries);
      }
    });
    vm.strikes = data;
    vm.display = data;
  }

  // get request to the database.
  $http({
    url: $sce.trustAsResourceUrl(db),
    method: 'jsonp'
  }).then(
    function success(response){
      vm.dataFilter(response.data.strike);
    },
    function fail(response){
      console.log(response);
    }
  );

  // modal controls
  $scope.open = function (size) {

    //passes the current drone strike to the modal instance controller.
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        items: function () {
          return vm.current;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    })
  };

};

// controller for when the modal is open
angular.module('droneStrikes').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
