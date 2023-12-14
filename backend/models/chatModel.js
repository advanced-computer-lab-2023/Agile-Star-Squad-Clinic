const mongoose = require('mongoose');
const validator = require('validator');
const chatSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: [true, 'Missing doctor ID']
  },
  patientId: {
    type: String,
    required: [true, 'Missing patient ID']
  },
  patientImg: {
    type: String
  },
  doctorImg: {
    type: String
  },
  messages: [{
    type: Object
  }],
  lastMessage: {
    type: Object
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Appointment;
