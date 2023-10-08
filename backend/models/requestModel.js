const mongoose = require('mongoose');
const Patient = require('./patientModel');
const validator = require('validator');
const Prescription = require('./prescriptionModel');

const requestSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username.'],
      unique: true,
      maxlength: [30, 'A username must have less or equal then 30 characters'],
      minlength: [8, 'A username must have more or equal to 8 characters'],
    },
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
      validate: [validator.isAlpha, 'Name must only contain letters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      minLength: 8,
    },
    dateOfBirth: Date,
    hourlyRate: {
      type: Number,
      required: [true, 'Please provide an hourly rate'],
    },
    affiliation: {
      type: String,
      required: [true, 'Please provide a hospital name'],
    },
    educationalBackground: {
      type: String,
      required: [true, 'Please provide an edcational background'],
    },

    speciality: {
      type: String,
      required: [true, 'Please provide your speciality'],
    },
    status: {
      type: String,
      enum: ['rejected', 'accepted', 'pending'],
      default: 'pending',
    },
    // patients: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Patient',
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// doctorSchema.virtual('patients', {
//   ref: 'Patient',
//   foreignField: 'doctor',
//   localField: '_id',
// });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
