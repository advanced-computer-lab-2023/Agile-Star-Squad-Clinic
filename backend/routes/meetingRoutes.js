const express = require('express');
const meetingController = require('../controllers/meetingController');

const router = express.Router({
  mergeParams: true,
});

router.route('/').post(meetingController.addMeeting).get(meetingController.getMeeting).delete(meetingController.deleteMeeting);

module.exports = router;