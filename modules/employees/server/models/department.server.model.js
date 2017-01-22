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
    trim: true,
    default: '',
    required: 'Please fill department name.',
  },
  del_flg: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Department', DepartmentSchema);
