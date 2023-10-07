const Prescription = require('../models/prescriptionModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllPrescription = catchAsync(async (req, res, next) => {
    const prescriptions = await Prescription.find().populate('doctor', 'patient');

    res.status(200).json({
        status: 'success',
        data: {
            prescriptions,
        },
    });
});