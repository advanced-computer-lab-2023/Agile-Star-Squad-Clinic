const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.doctorSignup)
  .patch(doctorController.updateDoctor);

module.exports = router;
