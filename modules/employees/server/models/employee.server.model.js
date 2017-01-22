'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  firstname: {
    type: String,
    default: '',
    required: 'Please fill Employee first name',
    trim: true
  },
  lastname: {
    type: String,
    default: '',
    required: 'Please fill Employee last name',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
    required: 'Please fill email',
  },
  gender: {
    type: Number,
    required: 'Please fill gender',
  },
  dept: {
    type: Schema.ObjectId,
    ref: 'Department',
    required: 'Please fill department',
  },
  birthdate: {
    type: Date,
    trim: true,
    required: 'Please fill birthdate',
  },
  hiredate: {
    type: Date,
    trim: true,
    required: 'Please fill hiredate',
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

mongoose.model('Employee', EmployeeSchema);
