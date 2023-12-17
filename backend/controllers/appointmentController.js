const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const Prescription = require('../models/appointmentModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const Appointment = require('../models/appointmentModel');
const Notifications = require('../models/notificationsModel');
const sendEmail = require('../utils/email');

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

  const pMessage = `Your appointment with doctor ${doctor.name} has been scheduled to be at ${req.body.dateOfAppointment}`
  const dMessage = `Your appointment with patient ${patient.name} has been scheduled to be at ${req.body.dateOfAppointment}`


  const newNotification = await Notifications.create({ patient: req.body.patient, doctor: req.body.doctor, appoinmentDate: req.body.dateOfAppointment, appointmentStatus: newAppointment.status, patientMessage: pMessage, doctorMessage: dMessage });

  doctor.appointments.push(newAppointment);
  await doctor.save();
  doctor.notifications.push(newNotification);
  await doctor.save();
  patient.appointments.push(newAppointment);
  await patient.save();
  patient.notifications.push(newNotification);
  await patient.save();


  await patient.save({ validateBeforeSave: false });
  await doctor.save({ validateBeforeSave: false });

  try {

    await sendEmail({
      email: patient.email,
      subject: 'You Have New Notification!',
      message: pMessage,
    });

    await sendEmail({
      email: doctor.email,
      subject: 'You Have New Notification!',
      message: dMessage,
    });

    res.status(200).json({
      status: 'success',
      data: {
        appointment: newAppointment,
        notification: newNotification
      },
    });
  }

  catch (err) {
    console.log(err)
  }
});

exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  const patient = await Patient.findById(appointment.patient);
  const doctor = await Doctor.findById(appointment.doctor);


  const pMessage = `Your appointment with doctor ${doctor.name} at ${req.body.dateOfAppointment} has been canceled`
  const dMessage = `Your appointment with patient ${patient.name} at ${req.body.dateOfAppointment} has been canceled`

  const newNotification = await Notifications.create({ patient: req.body.patient, doctor: req.body.doctor, appoinmentDate: req.body.dateOfAppointment, appointmentStatus: newAppointment.status, patientMessage: pMessage, doctorMessage: dMessage });


  patient.appointments.pull(appointment._id);
  await patient.save();
  doctor.appointments.pull(appointment._id);
  await doctor.save();
  doctor.notifications.push(newNotification);
  await doctor.save();
  patient.notifications.push(newNotification);
  await patient.save();

  try {

    await sendEmail({
      email: patient.email,
      subject: 'You Have New Notification!',
      message: pMessage,
    });

    await sendEmail({
      email: doctor.email,
      subject: 'You Have New Notification!',
      message: dMessage,
    });

    res.status(200).json({
      status: 'success',
      data: {
        appointment,
      },
    });

  }

  catch (err) {
    console.log(err)
  }
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    data: {
      appointment,
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
  // const patients = await Patient.findById(req.body.patient);
  // const patients = doctor.patients
  // patients.forEach((name) =>{
  //   names.push(name);
  // })
  for (const appointment of doctor.appointments) {
    if (isDateInFuture(appointment.dateOfAppointment)) {
      const patient = await Patient.findById(appointment.patient);
      const app = {
        // ...appointment,
        id: appointment.id,
        patientName: patient.name,
        date: appointment.dateOfAppointment

      }
      appointments.push(app);
    }
  }
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
      Appointment.findByIdAndUpdate(app._id, { status: "completed" })
      app.status = "completed";
    }
    const appointment = {
      _id: app._id,
      doctorName: doctor.name,
      category: doctor.speciality,
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
