const express = require('express');
const prescriptionController = require('../controllers/prescriptionController');
const middleware = require('../middleware/middleware.js');


const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(prescriptionController.getAllPrescription)
  .post(middleware.doctorAuth,prescriptionController.createPrescription);
router
  .route('/list')
  .post(prescriptionController.getPrescriptionByIds)
  
// router
//   .route('/:id')
//   .get(doctorController.getDoctor)
//   .patch(doctorController.updateDoctor)
//   .delete(doctorController.removeDoctor);

module.exports = router;
