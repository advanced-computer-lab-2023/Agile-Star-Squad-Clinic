const mongoose = require('mongoose');
const validator = require('validator');
const Patient = require('./patientModel');

const paymentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    // validate: [validator.isAlpha, 'Name must only contain letters'],
  },
  total: {
    type: Number,
    unique: true,
    required: [true],
  },
  age: {
    type: Number,
    required: [true],
  },
  dateBought: {
    type: Date,
    
  },
  product: [
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