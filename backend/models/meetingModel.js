const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meetingId: String
});

const Meeting = mongoose.model('meeting', meetingSchema);

module.exports = Meeting;
