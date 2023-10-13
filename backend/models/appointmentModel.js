const mongoose = require('mongoose');
const validator = require('validator');
const Doctor = require('./doctorModel');
const Patient = require('./patientModel');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'A doctor must be appointed to a patient.'],
  },

  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'A patient must be appointed to a doctor.'],
  },

  dateOfAppointment: {
    type: Date,
    required: [true, 'Please provide a date'],
    default: Date.now,
  },

  status: {
    type: String,
    enum: ['vaccant', 'reserved', 'passed'],
    required: [true, 'Please provide status'],
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
