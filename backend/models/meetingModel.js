const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meetingId: String,
    doctor: {
        type: Object,
      },
      patient: {
        type: Object,
      },
});

const Meeting = mongoose.model('meeting', meetingSchema);

module.exports = Meeting;
