// #Task route solution
const Notifications = require('../models/notificationsModel');
const Package = require('../models/packageModel');
const { default: mongoose } = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

// exports.addNotification = catchAsync(async (req, res, next) => {
//   const newNotification = await Notifications.create(req.body);
// ___
//   res.status(200).json({
//     status: 'success',
//     data: {
//       notification: newNotification,
//     },
//   });
  
// });

// exports.getNotifications = catchAsync(async (req, res, next) => {
//   try {
//     const allNotifications = await Notifications.find();
//     res.status(200).json(allNotifications);
//   } catch (error) {
//     console.error('ERROR retrieving packages', error);
//     res.status(500).json({ error: 'Failed to retrieve packages' });
//   }
// });

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };


exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notification = await Notifications.findByIdAndDelete(req.params.notificationId);

  console.log(req.params.notificationId);

  if (!notification) {
    return next(new AppError('No notification found with that ID', 404));
  }

  const patientId = notification.patient;
  const doctorId = notification.doctor;

  const patient = await Patient.findById(patientId);
  const doctor = await Doctor.findById(doctorId);

  patient.notifications.pop(notification);
  await patient.save();
  doctor.notifications.pop(notification);
  await doctor.save();


  res.status(204).json({
    status: 'success',
    data: null,
  });
});

