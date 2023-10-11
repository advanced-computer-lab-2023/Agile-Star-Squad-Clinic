const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Prescription = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const Appointment = require('../models/appointmentModel');

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
  // const patient = await Patient.findById(req.body.patient);
  const doctor = await Doctor.findById(req.body.doctor);
  // patient.appointment.push(newAppointment);

  // await patient.save();
  doctor.appointments.push(newAppointment);
  await doctor.save();

  res.status(200).json({
    status: 'success',
    data: {
      appointment: newAppointment,
    },
  });
});

const isDateInFuture = (dateToCompare) => {
  const currentDate = new Date();
  return dateToCompare > currentDate;
};

exports.upComingAppointments = catchAsync(async (req, res, next) => {
  const appointments = [];
  const names = [];
  const doctor = await Doctor.findById(req.params.doctorId).populate(
    'appointments'
  );
  const patients = await Patient.findById(req.body.patient)
  console.log(patients)
 // const patients = doctor.patients
  // patients.forEach((name) =>{
  //   names.push(name);
  // })
  doctor.appointments.forEach((appointment) => {
    console.log(appointment.patient)
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
