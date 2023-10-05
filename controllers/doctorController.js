const Doctor = require('../models/doctorModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find().populate('patients');

  res.status(200).json({
    status: 'success',
    data: {
      doctors,
    },
  });
});

exports.removeDoctor = catchAsync(async (req, res) => {
  const Doctor = await Doctor.findByIdAndDelete(req.body.id);

  if (!Doctor) {
    return next(new AppError('No Admin found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
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
  const filteredBody = filterObj(
    req.body,
    'email',
    'hourlyRate',
    'affiliation'
  );
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.body.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedDoctor) {
    return next(new AppError('Cannot update this field', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doctor: updatedDoctor,
    },
  });
});

exports.doctorSignup = async (req, res) => {
  const newDoctor = await Doctor.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      doctor: newDoctor,
    },
  });
};

exports.getMyPatients = async (req, res) => {};
