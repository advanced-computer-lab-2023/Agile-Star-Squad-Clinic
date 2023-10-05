const Admin = require('../models/adminModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchsync');

exports.createAdmin = catchAsync(async (req, res) => {
  const newAdmin = await Admin.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      admin: newAdmin,
    },
  });
});

exports.removeAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findByIdAndDelete(req.body.id);

  if (!admin) {
    return next(new AppError('No Admin found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getAllAdmins = catchAsync(async (req, res) => {
  const admins = await Admin.find();

  res.status(200).json({
    status: 'success',
    data: {
      admins,
    },
  });
});
