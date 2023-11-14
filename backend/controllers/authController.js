const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
let randomNumber = 0;
const maxAge = 3 * 24 * 60 * 60;

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
  });
});

exports.getUserByEmail = catchAsync(async (req, res, next) => {
  const email = req.params.email;
  const query = {};
  query.email = { $regex: email, $options: 'i', $eq: email };
  let user;

  const doctor = await Doctor.findOne(query);
  const patient = await Patient.findOne(query);
  const admin = await Admin.findOne(query);

  if (doctor) {
    user = doctor;
  } else if (patient) {
    user = patient;
  } else {
    user = admin;
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  const doctor = await Doctor.findById(id);
  const patient = await Patient.findById(id);
  const admin = await Admin.findById(id);

  if (doctor !== null) {
    await Doctor.findByIdAndUpdate(id, {
      password: newPassword,
    });
  } else if (patient !== null) {
    await Patient.findByIdAndUpdate(id, {
      password: newPassword,
    });
  } else if (admin !== null) {
    await Admin.findByIdAndUpdate(id, {
      password: newPassword,
    });
  } else {
    return next(new AppError('Id not found', 404));
  }
  res.status(200).json({
    status: 'success',
  });
});

const createToken = (id, role) => {
  const payload = {
    id,
    role,
  };

  const options = {
    expiresIn: '3d',
  };

  return jwt.sign(payload, 'supersecret', options);
};

// const login = async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const user = await userModel.findOne({ name: name });

//     if (user === null) {
//       return res.status(401).json({ error: "Invalid name" });
//     }

//     const dbHashedPassword = user.password;

//     const passwordIsCorrect = await bcrypt.compare(password, dbHashedPassword);

//     if (passwordIsCorrect) {
//       // Assuming user.role is the field representing the user's role
//       const { name, role } = user;

//       const token = createToken(name, role);
//       res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge * 1000 });
//       res.status(200).json({ name, role });
//     } else {
//       return res.status(401).json({ error: "Invalid password" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access', 401)
    );
  }

  next();
});

// function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = 'expires=' + d.toUTCString();
//   document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
// }

exports.logIn = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const password = req.params.password;

  let role = '';
  let user;

  const query = {};
  query.username = { $regex: username, $options: 'i', $eq: username };
  query.password = { $regex: password, $options: 'i', $eq: password };

  const doctor = await Doctor.findOne(query);
  const patient = await Patient.findOne(query);
  const admin = await Admin.findOne(query);

  if (doctor) {
    role = 'doctor';
    user = doctor;
  } else if (patient) {
    role = 'patient';
    user = patient;
  } else if (admin) {
    role = 'admin';
    user = admin;
  } else {
    return next(new AppError('Username or Password is incorrect ', 404));
  }

  const token = createToken(user._id, role);
  res.cookie('jwt', token, {
    maxAge: maxAge * 1000,
  });
  return res.status(200).json({
    status: 'success',
    data: {
      userId: user._id,
      role,
      token,
    },
  });
});

exports.logout = (req, res) => {
  res
    .status(200)
    .clearCookie('jwt', {
      maxAge: 1,
    })
    .json({ status: 'success' });
};
