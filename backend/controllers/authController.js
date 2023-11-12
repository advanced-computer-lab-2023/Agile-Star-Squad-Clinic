const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Admin = require('../models/adminModel');
let randomNumber = 0;

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1)Get doctor based on POSTed email
  const doctor = await Doctor.findOne({ email: req.params.email });
  const patient = await Patient.findOne({ email: req.params.email });

  if (!doctor && !patient) {
    res.status(404).json({
      status: 'failed',
      message: 'Email not found!',
    });
  }
  let user;
  if (doctor) {
    user = doctor;
  } else {
    user = patient;
  }
  //2)Generate the random reset number
  const min = 100000;
  const max = 999999;
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  await user.save({ validateBeforeSave: false });

  //3)Send the token to the doctor's email
  const message = `Your validation code is: ${randomNumber}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
      code: randomNumber,
    });
  } catch (err) {
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.getOTP = catchAsync(async (req, res, next) => {
  res.status(200).json({
    code: randomNumber,
  })
});

exports.getUserByEmail = catchAsync(async (req, res, next) => {
  const email = req.params.email;
  const query = {};
  query.email = { $regex: email, $options: 'i', $eq: email };
  let user;

  const doctor = await Doctor.find(query);
  const patient = await Patient.find(query);
  const admin = await Admin.find(query);

  if(doctor){
    user = doctor;
  }
  else if(patient){
    user = patient;
  }
  else{
    user = admin;
  }
  res.status(200).json({
    status: 'success',
    data:{
      user,
    }
  })
});

exports.updatePassword = catchAsync(async(req,res,next) => {
  const id = req.params.id;
  const newPassword = req.body.password;
  const doctor = await Doctor.findById(id);
  const patient = await Patient.findById(id);
  const admin = await Admin.findById(id);

  if(doctor){
    console.log("DOOOOOOCCCC")
    await Doctor.findByIdAndUpdate(id , {
      password: newPassword
    });
    console.log("LOOOOOOOOOOOOOOOOOOOOL")

  }
  else if(patient){
    await Patient.findByIdAndUpdate(id , {
      password: newPassword
    });
  }
  else if(admin){
    await Admin.findByIdAndUpdate(id , {
      password: newPassword
    });
  }
  else{
    res.status(404);
  }
    res.status(200).json({
      status : 'success',
    });

});