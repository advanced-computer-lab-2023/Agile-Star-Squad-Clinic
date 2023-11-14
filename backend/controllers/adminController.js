const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Request = require('../models/requestModel');

exports.createAdmin = catchAsync(async (req, res, next) => {
  try {
    const newAdmin = await Admin.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        admin: newAdmin,
      },
    });
  } catch (error) {
    const message = error.errors.password.properties.message;
    res.status(403).json({
      status: 'failure',
      message: message,
    });
  }
});

exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.find();

  res.status(200).json({
    status: 'success',
    data: {
      admins,
    },
  });
});

exports.getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      admin,
    },
  });
});

exports.removeAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);

  if (!admin) {
    return next(new AppError('No admin found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.viewAllRequests = catchAsync(async (req, res, next) => {
  const requests = await Request.find();

  res.status(200).json({
    status: 'success',
    data: {
      requests,
    },
  });
});
