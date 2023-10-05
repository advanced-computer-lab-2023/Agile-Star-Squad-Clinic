const Patient = require('../models/patientModel');
const catchsync = require('../utils/catchsync');
const Family = require('../models/familyModel');


exports.getAllPatients = catchsync(async (req, res, next) => {
  const patients = await Patient.find().populate('doctor');

  res.status(200).json({
    status: 'success',
    data: {
      patients,
    },
  });
});

exports.removePatient = async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.body.id);

  if (!patient) {
    return next(new AppError('No Admin found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.addFamilyMember = catchsync(async (req, res, next) => {
  const newMember = await Family.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      member: newMember,
    },
  });
});

// exports.getAllFamilyMembers = catchAsync(async(req,res,next)=>{
//   const members = await.Family.find()
// })

exports.signup = async (req, res) => {
  const newPatient = await Patient.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      patient: newPatient,
    },
  });
};
