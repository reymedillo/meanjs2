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
  Department.find().populate('name').exec(function(err,depts) {
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(depts);
    }
  });
};
