'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Department Schema
 */
var DepartmentSchema = new Schema({
  // Department model fields
  name: {
    type: String,
    default: '',
    required: 'Please fill department name.',
    trim: true,
  },
  del_flg: {
    type: Number,
  }
});

mongoose.model('Department', DepartmentSchema);
