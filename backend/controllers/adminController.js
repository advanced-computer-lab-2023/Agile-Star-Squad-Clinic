const Admin = require('../models/adminModel');
// const Doctor = require('../models/doctorModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Request = require('../models/requestModel');
const Doctor = require('../models/doctorModel');

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
    res.status(403).json(
      {
        status: 'failure',
        message: message
      }
    );
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


exports.acceptRequest = catchAsync(async (req, res, next) => {
  console.log(req.body);
  try {
  const newDoctor = await Doctor.create(req.body);
  await Request.findByIdAndUpdate(req.body.id, { status: 'Accepted' }, { new: true });
  res.status(200).json({
    status: 'success',
    data: {
      doctor: newDoctor,
    },
  });
  // If the creation is successful, you can proceed with any additional logic here.
  // For example, you can send a success response to the client.
} catch (error) {
  console.log(error);
  // The `catch` block will catch any errors that occur during the `Doctor.create` operation.
  // You can provide a meaningful error message based on the specific error or condition.
  
  // You can check the type of the error and handle it accordingly.
  if (error.name === 'ValidationError') {
    // Handle validation errors (if using a validation library like Joi or Yup).
    // Construct a meaningful error response for the client.
  } else if (error.name === 'MongoError' && error.code === 11000) {
    // Handle duplicate key (unique constraint) errors for MongoDB, if applicable.
    // Construct a meaningful error response for the client.
  } else {
    // Handle other types of errors. You can log the error for debugging purposes
    // and provide a general error response to the client.
    console.error(error);
    // Send an error response to the client with an appropriate status code and message.
  }
}


});