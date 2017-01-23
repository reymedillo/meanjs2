(function () {
  'use strict';

  // Employees controller
  angular
    .module('employees')
    .controller('EmployeesController', EmployeesController);

  EmployeesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'employeeResolve', 'Departments'];

  function EmployeesController ($scope, $state, $window, Authentication, employee, Departments) {
    var vm = this;

    $scope.dt = new Date();
    $scope.hiredate = {
      opened: false
    };
    $scope.birthdate = {
      opened: false
    };

    console.log(this);

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
    vm.employee.dept = null;
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
