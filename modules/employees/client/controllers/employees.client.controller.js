(function () {
  'use strict';

  // Employees controller
  angular
    .module('employees')
    .controller('EmployeesController', EmployeesController);

  EmployeesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'employeeResolve'];

  function EmployeesController ($scope, $state, $window, Authentication, employee) {
    var vm = this;
    console.log(employee);

    $scope.dt = new Date();
    $scope.hiredate = {
      opened: false
    };
    $scope.birthdate = {
      opened: false
    };
    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.date = {
      dateOptions: {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(1980, 1, 1),
        startingDay: 1
      }
    };
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    // Disable weekend selection
    $scope.weekendDisable = function (date,mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    vm.authentication = Authentication;
    vm.employee = employee;
    vm.employee.hiredate = new Date(vm.employee.hiredate);
    vm.employee.birthdate = new Date(vm.employee.birthdate);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Employee
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.employee.$remove($state.go('employees.list'));
      }
    }

    // Save Employee
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.employeeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.employee._id) {
        vm.employee.$update(successCallback, errorCallback);
      } else {
        vm.employee.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('employees.view', {
          employeeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
