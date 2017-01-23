'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Department = mongoose.model('Department'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Department
 */
exports.create = function (req, res) {

};

/**
 * Show the current Department
 */
exports.read = function (req, res) {
  var department = req.department ? req.department.toJSON() : {};
  res.jsonp(department);
};

/**
 * Update a Department
 */
exports.update = function (req, res) {

};

/**
 * Delete an Department
 */
exports.delete = function (req, res) {

};

/**
 * List of Departments
 */
exports.list = function (req, res) {
  Department.find().populate('_id','name').exec(function(err, departments) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      res.jsonp(departments);
    }
  });
};

/**
 * Department middleware
 */
exports.departmentByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Department is invalid'
    });
  }

  Department.findById(id).populate('_id','name').exec(function (err, dept) {
    if (err) {
      return next(err);
    } else if (!dept) {
      return res.status(404).send({
        message: 'No Department with that identifier has been found'
      });
    }
    req.department = dept;
    next();
  });
};
