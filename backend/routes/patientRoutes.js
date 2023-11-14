const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');
const appointmentController = require('../controllers/appointmentController');
const prescriptionController = require('../controllers/prescriptionController');
const middleware = require('../middleware/middleware.js');

const router = express.Router();

router
  .route('/appointments')
  .get(appointmentController.getAllAppointments)
  .post(middleware.patientAuth, appointmentController.createAppointment);

router.use('/:id/doctors', middleware.patientAuth, doctorRouter);

router
  .route('/:patientId/familyMembers')
  .get(middleware.patientAuth, patientController.getFamilyMembers)
  .post(middleware.patientAuth, patientController.addFamilyMember);

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.signup);

router
  .route('/:id')
  .get(middleware.adminAuth, patientController.getPatient)
  .delete(middleware.adminAuth, patientController.removePatient);

router
  .route('/getByNationalId/:nationalId')
  .get(middleware.patientAuth, patientController.getPatientByNationalId);

router
  .route('/:patientId/prescriptions')
  .get(middleware.patientAuth, prescriptionController.getPatientPrescriptions);

router
  .route('/:patientId/upcomingAppointments')
  .get(
    middleware.patientAuth,
    appointmentController.upComingAppointmentsForPatients
  );

router
  .route('/:patientId/appointments')
  .get(appointmentController.allAppointmentsForPatients);

module.exports = router;
