const mongoose = require('mongoose');
const validator = require('validator');
const Patient = require('./patientModel');

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    // validate: [validator.isAlpha, 'Name must only contain letters'],
  },
  total: {
    type: Number,
    unique: true,
    required: [true, 'Please provide your NationalID.'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide your age.'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Family',
    },
  ],
  patient: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      // required: [true, 'Member must belong to a patient.'],
    },
  ],
});