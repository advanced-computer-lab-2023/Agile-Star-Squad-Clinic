const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');

const router = express.Router();

router.use('/:patientId/doctors', doctorRouter);

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.signup);

router
  .route('/:id')
  .get(patientController.getPatient)
  .delete(patientController.removePatient);

router
  .route('/:id/prescriptions')
  .get(patientController.getPatientPrescription);

module.exports = router;
