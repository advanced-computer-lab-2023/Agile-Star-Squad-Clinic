const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');

const router = express.Router();

router.use('/:id/doctors', doctorRouter);

router
  .route('/:patientId/familyMembers')
  .get(patientController.getFamilyMembers)
  .post(patientController.addFamilyMember);

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.signup);

router
  .route('/:id')
  .get(patientController.getPatient)
  .delete(patientController.removePatient);

router.route('/:patientId/getDoctor').get(patientController.getDoctor);

module.exports = router;
