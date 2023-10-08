const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Prescription = require('../models/prescriptionModel');
const APIFeatures = require('../utils/apiFeatures');
const Request = require('../models/requestModel');

exports.doctorSignup = catchAsync(async (req, res, next) => {
  const newRequest = await Request.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      request: newRequest,
    },
  });
});

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Doctor.find(), req.query)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const doctors = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      doctors,
    },
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findOne(req.params.id).populate('patients');

  res.status(200).json({
    status: 'success',
    data: {
      doctor,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  console.log(allowedFields);
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateDoctor = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError('Cannot update password in this route!', 400));
  }

  const filteredBody = filterObj(
    req.body,
    'email',
    'hourlyRate',
    'affiliation'
  );
  console.log(filteredBody);
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  // if (!updatedDoctor) {
  //   return next(new AppError('Cannot update this field', 400));
  // }
  res.status(200).json({
    status: 'success',
    data: {
      doctor: updatedDoctor,
    },
  });
});

exports.removeDoctor = catchAsync(async (req, res, next) => {
  const Doctor = await Doctor.findByIdAndDelete(req.params.id);

  if (!Doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMyPatients = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.doctorId).populate(
    'patients'
  );

  res.status(200).json({
    status: 'success',
    data: {
      patients: doctor.patients,
    },
  });
});

exports.getMyPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({
    name: { $regex: req.body.name, $options: 'i' },
  });

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});

exports.addPatient = catchAsync(async (req, res, next) => {
  const doctorId = req.params.doctorId;

  // Find the doctor by ID
  const doctor = await Doctor.findById(doctorId);

  if (!doctor) {
    return next(new AppError('Doctor not found', 404));
  }

  // Find the patient by ID
  const patient = await Patient.findById(req.body);

  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }

  // Associate the patient with the doctor
  doctor.patients.push(patient._id);
  patient.doctor.push();
  await doctor.save();
  res.status(200).json({
    status: 'success',
  });
});
