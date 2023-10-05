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
    return next(new AppError('Cannot update password in this route!',400));
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

exports.doctorSignup = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      doctor: newDoctor,
    },
  });
});

exports.getMyPatients = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate('patients')
};

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      doctor,
    },
  });
});
