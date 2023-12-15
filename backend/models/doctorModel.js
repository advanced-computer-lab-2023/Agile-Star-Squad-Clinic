const mongoose = require('mongoose');
const Patient = require('./patientModel');
const validator = require('validator');
const Prescription = require('./prescriptionModel');
const Appointment = require('./appointmentModel');

const doctorSchema = new mongoose.Schema(
  {
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
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
      // minLength: 8,
    },
    dateOfBirth: Date,
    dateOfCreation: { type: Date, default: Date.now },
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
      required: [false],
    },
    speciality: {
      type: String,
      required: [true, 'Please provide your speciality'],
    },
    rating: {
      type: Number,
      default: 5,
    },
    personalImage: {
      type: String,
      required: [true, "Please provide your personal image."],
    },
    appointments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Appointment',
        default: [],
      },
    ],
    patients: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["member", "accepted"],
      default: "accepted"
    },
    wallet:{
      type: Number,
      default:0,
  
    },

    chats: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
      }
    ],
    // role: {
    //   type: String,
    //   default: "doctor",
    //   select: false
    // }
    timeSlots: [
      {
        type: Array,
      }
    ]
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

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
