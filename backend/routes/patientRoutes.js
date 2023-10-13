const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');
const appointmentController = require('../controllers/appointmentController')
const prescriptionController = require('../controllers/prescriptionController')

const router = express.Router();

router
  .route('/appointments')
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment);

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

  router
  .route('/:patientId/prescriptions')
  .get(prescriptionController.getPatientPrescriptions);
router
  .route('/:patientId/upcomingAppointments')
  .get(appointmentController.upComingAppointmentsForPatients);

module.exports = router;
