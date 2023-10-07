const Patient = require('../models/patientModel');
const Prescription = require('../models/prescriptionModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllPrescription = catchAsync(async (req, res, next) => {
    const prescriptions = await Prescription.find().populate('doctor').populate('patient');

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