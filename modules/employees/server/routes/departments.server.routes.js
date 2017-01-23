'use strict';

var employeesPolicy = require('../policies/employees.server.policy'),
  departments = require('../controllers/departments.server.controller');

module.exports = function(app) {
  // Routing logic   
  app.route('/api/departments').all(employeesPolicy.isAllowed)
    .get(departments.list)
    .post(departments.create);

  app.route('/api/departments/:departmentId').all(employeesPolicy.isAllowed)
    .get(departments.read)
    .put(departments.update)
    .delete(departments.delete);

  // Finish by binding the Department middleware
  app.param('departmentId', departments.departmentByID);
};
