const Patient = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');
const Family = require('../models/familyModel');
const AppError = require('../utils/appError');
const Doctor = require('../models/doctorModel');
const apiFeatures = require('../utils/apiFeatures');

exports.signup = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create(req.body)
    .then((result) => {
      return result; // Forward the result for further processing
    })
    .catch((error) => {
      console.error('Error creating patient:', error.message);
      throw error; // Re-throw the error for further handling
    });


  if (newPatient == null) {
    res.status(404).json({
      status: 'fail',
      data: {
        error: 'error',
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      patient: newPatient,
    },
  });
});

exports.getPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id).populate({
    path: 'doctor',
    select: '-__v -dateOfBirth -hourlyRate -affiliation -educationalBackground',
  }).populate('package');

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});
exports.getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find().populate('doctor').populate('package');

  res.status(200).json({
    status: 'success',
    data: {
      patients,
    },
  });
});

exports.removePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) {
    return next(new AppError('No patient found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.addFamilyMember = catchAsync(async (req, res, next) => {
  const patientId = req.params.patientId;
  const memberData = req.body;
  // Find the doctor by ID
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }

  // Find the patient by ID
  const newMember = new Family({
    ...memberData,
    patient: patient._id,
  });

  // Associate the patient with the doctor
  const updatedFamily = [...patient.familyMembers, newMember._id];
  await Family.create(newMember);
  await Patient.findByIdAndUpdate(patient._id, {familyMembers: updatedFamily});
  res.status(200).json({
    status: 'success',
  });
});

exports.getFamilyMembers = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.patientId).populate(
    'familyMembers'
  );

  res.status(200).json({
    status: 'success',
    data: {
      members: patient.familyMembers,
    },
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const { name, speciality } = req.body;
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i', $eq: name };
  }
  if (speciality) {
    query.speciality = { $regex: speciality, $options: 'i' };
  }
  const doctor = await Doctor.find(query);

  res.status(200).json({
    status: 'success',
    data: {
      doctor,
    },
  });
});

// Modules.exports = {createPatient}
