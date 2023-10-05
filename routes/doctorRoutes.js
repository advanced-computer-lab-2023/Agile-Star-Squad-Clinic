const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.doctorSignup);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.removeDoctor);

module.exports = router;
