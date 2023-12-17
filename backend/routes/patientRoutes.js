const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');
const appointmentController = require('../controllers/appointmentController');
const prescriptionController = require('../controllers/prescriptionController');
const notificationController = require('../controllers/notificationController.js');
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
  .route('/:patientId/familyMembers/:id')
  .delete(middleware.patientAuth, patientController.removeFamilyMember);

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.signup);
router
  .route('/:patientId/package')
  .post(patientController.subscribePackage)
  .patch(patientController.unsubscribePackage);
router
  .route('/:id')
  .get(patientController.getPatient)
  .patch(middleware.adminAuth, patientController.addHealthRecord)
  .delete(middleware.adminAuth, patientController.removePatient);

router
  .route('/:id/kimoSubscribe')
  .post(patientController.kimoSubscribe);

router
  .route('/getByNationalId/:nationalId')
  .get(middleware.patientAuth, patientController.getPatientByNationalId);

router
  .route('/:id/setHealthRecords')
  .patch(patientController.removeHealthRecord);

router
  .route('/:patientId/prescriptions')
  .get(middleware.patientAuth, prescriptionController.getPatientPrescriptions);

router
  .route('/:patientId/appointments')
  .get(appointmentController.allAppointmentsForPatients);

router
  .route('/:patientId/upcomingAppointments')
  .get(appointmentController.upComingAppointmentsForPatients);

router
  .route('/:patientId/notifications/:notificationId')
  .delete(middleware.patientAuth , notificationController.deleteNotification);

  router
  .route('/:patientId/notifications')
  .get(middleware.patientAuth , patientController.getMyNotifications)
  
router
  .route('/:patientId/wallet')
  .post(patientController.updateWallet)
  .get(
    middleware.patientAuth,
    appointmentController.upComingAppointmentsForPatients
  );

router
  .route("/:patientId/chats")
  .get(middleware.patientAuth,
    patientController.getChatIds);

router
  .route('/:doctorId/doctorUpcomingAppointments')
  .get(
    middleware.patientAuth,
    appointmentController.upComingAppointmentsForDoctors
  );

router
  .route('/:patientId/cards')
  .post(patientController.addCard);

router
  .route('/:patientId/cards/:cardNumber')
  .delete(patientController.deleteCard);


  

module.exports = router;
