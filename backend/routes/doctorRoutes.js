const express = require('express');
const doctorController = require('../controllers/doctorController');
router.route('/appointments').get(appointmentController.getAllAppointments).post(appointmentController.createAppointment)
const router = express.Router({
  mergeParams: true,
});
router.route('/appointments').get(appointmentController.getAllAppointments).post(appointmentController.createAppointment)
router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.doctorSignup);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.removeDoctor);

router
  .route('/:doctorId/patients')
  .get(doctorController.getMyPatients)
  .post(doctorController.addPatient);
router.route('/:id/patient').get(doctorController.getMyPatient);
router.route('/:id/appointments').get(doctorController.getMyAppointments);
module.exports = router;
