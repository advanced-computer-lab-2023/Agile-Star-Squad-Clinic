const Patient = require('../models/patientModel');
const Prescription = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const Appointment = require('../models/appointmentModel');


exports.getAllAppointments = catchAsync(async (req, res, next) => {
    // const prescriptions = await Prescription.find().populate('doctor').populate('patient');

    const features = new APIFeatures(Appointment.find(), req.query)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const appointments = await features.query;

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

    patient.appointment.push(newAppointment);

    await patient.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment: newAppointment,
      },
    });
  });