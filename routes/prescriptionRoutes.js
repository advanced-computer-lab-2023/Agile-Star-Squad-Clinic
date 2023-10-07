const express = require('express');
const prescriptionController = require('../controllers/prescriptionController');

const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(prescriptionController.getAllPrescription)
  .post(prescriptionController.createPrescription);

// router
//   .route('/:id')
//   .get(doctorController.getDoctor)
//   .patch(doctorController.updateDoctor)
//   .delete(doctorController.removeDoctor);

module.exports = router;
