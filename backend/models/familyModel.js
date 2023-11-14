const mongoose = require('mongoose');
const validator = require('validator');
const Patient = require('./patientModel');

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Please provide your name.'],
    // validate: [validator.isAlpha, 'Name must only contain letters'],
  },
  NationalID: {
    type: Number,
    unique: true,
    // required: [true, 'Please provide your NationalID.'],
  },
  age: {
    type: Number,
    // required: [true, 'Please provide your age.'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  relation: {
    type: String,
    enum: ['wife', 'husband', 'son', 'daughter'],
    // required: [true, 'Please provide your relation to the patient.'],
  },
  patient: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
      // required: [true, 'Member must belong to a patient.'],
    },
  ],
});
// familySchema.pre(/^find/,function(next){
//   this.populate({
//     path:'patient',
//     select:'name'
//   })
//   next();
// })

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
