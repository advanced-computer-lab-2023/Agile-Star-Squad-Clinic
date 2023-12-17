const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  patient:
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient'
  },
  doctor:
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  },
  appoinmentDate:
  {
    type: Date
  },
  appointmentStatus:
  {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
  },
  patientMessage:
  {
    type: String,
  },
  doctorMessage:
  {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

const Notifications = mongoose.model('Notification', notificationSchema);

module.exports = Notifications;
