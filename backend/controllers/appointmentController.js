const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Prescription = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const Appointment = require('../models/appointmentModel');
const Notifications = require('../models/notificationsModel');

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find()
    .populate('doctor')
    .populate('patient');

  res.status(200).json({
    status: 'success',
    data: {
      appointments,
    },
  });
});

exports.createAppointment = catchAsync(async (req, res, next) => {
  const newAppointment = await Appointment.create(req.body);
  const patient = await Patient.findById(req.body.patient);
  const doctor = await Doctor.findById(req.body.doctor);
  const newNotification = await Notifications.create(patient , doctor);
  
  doctor.appointments.push(newAppointment);
  await doctor.save();
  doctor.notifications.push(newNotification);
  await doctor.save();
  patient.appointments.push(newAppointment);
  await patient.save();
  patient.notifications.push(newNotification);
  await patient.save();

  res.status(200).json({
    status: 'success',
    data: {
      appointment: newAppointment,
      notification: newNotification
    },
  });
});

const isDateInFuture = (dateToCompare) => {
  const currentDate = new Date();
  return dateToCompare > currentDate;
};

exports.upComingAppointmentsForDoctors = catchAsync(async (req, res, next) => {
  const appointments = [];
  const names = [];
  const doctor = await Doctor.findById(req.params.doctorId).populate(
    'appointments'
  );
  const patients = await Patient.findById(req.body.patient);
  // const patients = doctor.patients
  // patients.forEach((name) =>{
  //   names.push(name);
  // })
  doctor.appointments.forEach((appointment) => {
    if (isDateInFuture(appointment.dateOfAppointment))
      appointments.push(appointment);
  });
  res.status(200).json({
    status: 'success',
    data: {
      appointments,
      names,
    },
  });
});

exports.allAppointmentsForPatients = catchAsync(async (req, res, next) => {
  const appointments = [];
  const patient = await Patient.findById(req.params.patientId).populate(
    'appointments'
  );

  for (const app of patient.appointments) {
    const doctor = await Doctor.findById(app.doctor);
    const date = new Date(app.dateOfAppointment);
    let status = app.status;
    if (app.status === "upcoming" && !isDateInFuture(app.dateOfAppointment)) {
      Appointment.findByIdAndUpdate(app._id, {status: "completed"})
      app.status = "completed";
    }
    const appointment = {
      _id: app._id,
      doctorName: doctor.name,
      doctorId: doctor.id,
      date: date,
      status: status,
    };
    appointments.push(appointment);
  }

  res.status(200).json({
    status: 'success',
    data: {
      appointments: appointments,
    },
  });
});

exports.upComingAppointmentsForPatients = catchAsync(async (req, res, next) => {
  const appointments = [];
  const patient = await Patient.findById(req.params.patientId).populate(
    'appointments'
  );

  for (const app of patient.appointments) {
    const doctor = await Doctor.findById(app.doctor);
    const date = new Date(app.dateOfAppointment);
    const appointment = {
      _id: app._id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.speciality,
      doctorId: doctor.id,
      date: date,
      status: app.status,
    };
    if (isDateInFuture(app.dateOfAppointment)) appointments.push(appointment);
  }

  res.status(200).json({
    status: 'success',
    data: {
      appointments: appointments,
    },
  });
});
