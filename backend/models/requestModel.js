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
      // maxlength: [30, 'A username must have less or equal then 30 characters'],
      // minlength: [8, 'A username must have more or equal to 8 characters'],
    },
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
      // validate: [validator.isAlpha, 'Name must only contain letters'],
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
      // minLength: 8,
    },
    dateOfBirth: Date,
    creationDate: { type: Date, default: Date.now },
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

    mobileNumber: {
      type: String,
      required: [false]
    },
    speciality: {
      type: String,
      required: [true, 'Please provide your speciality'],
    },
    status: {
      type: String,
      enum: ['Rejected', 'Accepted', 'Pending'],
      default: 'Pending',
    },
    idImage: {
      type: String,
      required: [true, "Please provide your ID."],
    },
    medicalLicense: {
      type: String,
      required: [true, "Please provide your medical license."],
    },
    medicalDegree: {
      type: String,
      required: [true, "Please provide your medical degree."],
    },
    personalImage: {
      type: String,
      required: [true, "Please provide your personal image."],
    },

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
