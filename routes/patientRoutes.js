const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');

const router = express.Router();

router.use('/:patientId/doctors', doctorRouter);

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.signup);
// router.route('/').get(patientController.getAllPatients).post(patientController.createPatient);

module.exports = router;
