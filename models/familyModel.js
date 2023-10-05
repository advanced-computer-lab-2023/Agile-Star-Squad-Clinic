const mongoose = require('mongoose');
const validator = require('validator');
const Patient = require('./patientModel');

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    validate: [validator.isAlpha, 'Name must only contain letters'],
  },
  NationalID: {
    type: Number,
    required: [true, 'Please provide your NationalID.'],
    validate: [validator.isNumeric, 'NationalID must only contain numbers'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide your age.'],
    validate: [validator.isNumeric, 'Age must only contain numbers'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  relation: {
    type: String,
    required: [true, 'Please provide your relation to the patient.'],
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'Member must belong to a patient.'],
  },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
