const mongoose = require('mongoose');
const validator = require('validator');
const Doctor = require('./doctorModel');
const Family = require('./familyModel');
const Appointment = require('./appointmentModel');
const Prescription = require('./prescriptionModel');

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username.'],
    unique: true,
    maxlength: [30, 'A username must have less or equal then 30 characters'],
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
    lowercase: true,
    // validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    // minLength: 8,
  },
  dateOfBirth: Date,
  creationDate: Date,
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please provide a phone number.'],
  },
  nationalId: {
    type: String,
    unique: true,
    required: [false, 'Please provide a national ID.'],
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: [true, 'Please provide a full name.'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide an emergency phone number.'],
    },
  },
  medicalRecord: [
    {
      type: String,
      // required: [true, 'Please provide your medical record']
      default: ""
    }
  ],
  package:
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Package'
  },
  prescription: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Prescription',
    },
  ],
  familyMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Family',
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Appointment',
    },
  ],
  wallet: {
    type: Number,
    default: 0,

  },

  chats: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Chat'
    }
  ],

  cancellationDate: {
    type: Date,
    default: null
  },

  notifications: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Notification',
    },
  ],

  subscriptionDate: Date,

  expiringDate: Date,
    

  cards: [
    {
      name: String,
      cardNumber: String,
      expiryMonth: String,
      expiryYear: String,
      cvv: String,
      label: String,
    },
  ],
  
  subscriptionDate:Date,
  
  expiringDate:Date,

});
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
