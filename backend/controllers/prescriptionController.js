const Patient = require('../models/patientModel');
const Prescription = require('../models/prescriptionModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPrescription = catchAsync(async (req, res, next) => {
  // const prescriptions = await Prescription.find().populate('doctor').populate('patient');

  const features = new APIFeatures(Prescription.find(), req.query)
    .filter()
    .sort()
    .fieldLimit()
    .paginate();
  const prescriptions = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      prescriptions,
    },
  });
});

exports.createPrescription = catchAsync(async (req, res, next) => {
  const newPrescription = await Prescription.create(req.body);
  const patient = await Patient.findById(req.body.patient);

  patient.prescription.push(newPrescription);

  await patient.save();

  res.status(200).json({
    status: 'success',
    data: {
      prescription: newPrescription,
    },
  });
});
exports.editPrescription = async (req, res) => {
  const editedPackage = await Prescription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      presc: editedPackage,
    },
  });
};

exports.getPatientPrescriptions = catchAsync(async (req, res, next) => {
  const myApps = [];
  const patient = await Patient.findById(req.params.patientId).populate(
    'prescription'
  );
  patient.prescription.forEach((prescription) => {
    myApps.push(prescription);
  });
  res.status(200).json({
    status: 'success',
    data: {
      prescriptions: patient.prescription,
    },
  });
});

exports.getPatientPrescriptionsByUsername = catchAsync(async (req, res, next) => {
  const myApps = [];
  try {
    const patient = await Patient.findOne(
    { username: req.params.username},
    ).populate(
      'prescription'
      );
      patient.prescription.forEach((prescription) => {
        myApps.push(prescription);
      });
  res.status(200).json({
    status: 'success',
    data: {
      prescriptions: patient.prescription,
    },
  });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
});

exports.getPrescriptionByIds = catchAsync(async (req, res, next) => {
  const { prescriptionIds } = req.body; // Assuming prescriptionIds is an array of IDs
  
  // Fetch prescriptions using IDs

  
  const prescriptions = await Prescription.find({ _id: { $in: req.body.prescriptions } });

  res.status(200).json({
    status: 'success',
    data: {
      prescriptions,
    },
  });
});
