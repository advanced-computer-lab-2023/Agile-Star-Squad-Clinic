const express = require('express');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');
const middleware = require('../middleware/middleware.js');

const router = express.Router({
  mergeParams: true,
});
router
  .route('/appointments')
  .get(middleware.doctorAuth, appointmentController.getAllAppointments)
  .post(middleware.doctorAuth, appointmentController.createAppointment);

router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.doctorSignup);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(middleware.doctorAuth, doctorController.updateDoctor)
  .delete(doctorController.removeDoctor);

router
  .route('/:doctorId/patients')
  .get(middleware.doctorAuth, doctorController.getMyPatients)
  .post(doctorController.addPatient);

router
  .route('/:id/patient')
  .get(middleware.doctorAuth, doctorController.getMyPatient);

router
  .route('/:doctorId/upComingAppointments')
  .get(
    middleware.doctorAuth,
    appointmentController.upComingAppointmentsForDoctors
  );
module.exports = router;
