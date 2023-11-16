const Patient = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');
const Family = require('../models/familyModel');
const AppError = require('../utils/appError');
const Doctor = require('../models/doctorModel');
const apiFeatures = require('../utils/apiFeatures');
const Appointment = require('../models/appointmentModel');
const Prescription = require('../models/prescriptionModel');
const { response } = require('express');
const Package = require('../models/packageModel');

exports.signup = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create(req.body)
    .then((result) => {
      return result; // Forward the result for further processing
    })
    .catch((error) => {
      console.error('Error creating patient:', error.message);
      throw error; // Re-throw the error for further handling
    });

  if (newPatient == null) {
    res.status(404).json({
      status: 'fail',
      data: {
        error: 'error',
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      patient: newPatient,
    },
  });
});

exports.getPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id).populate('package');

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});

exports.getPatientByNationalId = catchAsync(async (req, res, next) => {
  const patient = await Patient.findOne({
    nationalId: req.params.nationalId,
  }).populate('package');

  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
});
exports.getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find().populate('package');

  res.status(200).json({
    status: 'success',
    data: {
      patients,
    },
  });
});

exports.removePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  await Appointment.findAndDelete({
    patient: req.params.id,
  });
  await Prescription.findAndDelete({
    patient: req.params.id,
  });

  if (!patient) {
    return next(new AppError('No patient found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.addFamilyMember = catchAsync(async (req, res, next) => {
  const patientId = req.params.patientId;
  const memberData = req.body;
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }

  let memberPatientAccount = {memberPatientId: null};

  if(memberData.email.length > 0 || memberData.mobileNumber.length > 0){
    memberPatientAccount = await Patient.findOne({
      $or: [
        { email: memberData.email },
        { mobileNumber: memberData.mobileNumber },
      ],
    });
  } 
  
  const newMember = new Family({
    ...memberData,
    memberPatientId: memberPatientAccount._id,
    patient: patient._id,
  });

  const updatedFamily = [...patient.familyMembers, newMember._id];
  await Family.create(newMember).catch((error) => {
    console.error('Error creating family member:', error.message);
    throw error; // Re-throw the error for further handling
  });
  await Patient.findByIdAndUpdate(patient._id, {
    familyMembers: updatedFamily,
  });
  res.status(200).json({
    status: 'success',
  });
});

exports.getFamilyMembers = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.patientId).populate(
    'familyMembers',
  );

  res.status(200).json({
    status: 'success',
    data: {
      members: patient.familyMembers,
    },
  });
});
exports.subscribePackage = catchAsync(async (req, res, next) => {
  const patientId = req.params.patientId;
  const packageData = req.body;
  const discount = 0;
  const familyMember = await Family.findById(patientId)
  if (familyMember != null) {
    const patient = await Patient.findById(familyMember._id)
    discount = packageData.familyMemberDiscount
  }



  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }
  if (patient.package != null) {
    return next(new AppError('You are already subscribed to a Package', 404));
  }

  await Patient.findByIdAndUpdate(patient._id, {
    package: packageData,
    subscriptionDate: Date.now(),
    expiringDate: Date.now() + (365 * 24 * 60 * 60 * 1000)
  });

  res.status(200).json({
    status: 'success',
    discount
  });
});

exports.kimoSubscribe = catchAsync(async (req, res, next) => {
  const patientId = req.params.id;
  const packageId = req.body.packageId;
  const patient = await Patient.findById(patientId)

  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }
  try {
     await Patient.findByIdAndUpdate(patientId, {
    package: packageId,
    subscriptionDate: Date.now(),
    expiringDate: Date.now() + (365 * 24 * 60 * 60 * 1000),
  });
    console.log("all ggood")
  } catch (error) {
    console.log(error);
  }
 
  res.status(200).json({
    status: 'success'
  });
});

exports.unsubscribePackage = catchAsync(async (req, res, next) => {
  const patientId = req.params.patientId;
  const packageData = req.body;

  const patient = await Patient.findById(patientId);

  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }
  if (patient.package == null) {
    return next(new AppError('You are not subsribed to any Packages', 404));
  }

  await Patient.findByIdAndUpdate(patient._id, {

    package: null,
    cancellationDate: Date.now()
  });

  res.status(200).json({
    status: 'success',
  });
});



exports.getDoctor = catchAsync(async (req, res, next) => {
  const { name, speciality } = req.body;
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i', $eq: name };
  }
  if (speciality) {
    query.speciality = { $regex: speciality, $options: 'i' };
  }
  const doctor = await Doctor.find(query);

  res.status(200).json({
    status: 'success',
    data: {
      doctor,
    },
  });
});




exports.removeSubscription = catchAsync(async (req, res, next) => {
  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      package: null,
      cancellationDate: Date.now()
    },

    // {
    //   new: true,
    //   runValidators: true,
    // }
  ).catch(error => {
    console.log(error)
  });
  if (!updatedPatient) {
    res.status(404).json({ error })
  }
  res.status(200).json({
    status: 'success',
    data: {
      patient: updatedPatient,
      cancellationDate: updatedPatient.cancellationDate
    },
  });
});

exports.addHealthRecord = catchAsync(async (req, res, next) => {
  console.log("ehna hena");
  console.log(req.body);
  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      $push: { medicalRecord: req.body.medicalRecord },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPatient) {
    return next(new AppError('No patient found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      patient: updatedPatient,
    },
  });
});


exports.getDoctor = catchAsync(async (req, res, next) => {
  const { name, speciality } = req.body;
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i', $eq: name };
  }
  if (speciality) {
    query.speciality = { $regex: speciality, $options: 'i' };
  }
  const doctor = await Doctor.find(query);

  res.status(200).json({
    status: 'success',
    data: {
      doctor,
    },
  });
});


exports.removeHealthRecord = catchAsync(async (req, res, next) => {
  const updatedPatient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      medicalRecord: req.body.medicalRecord
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPatient) {
    return next(new AppError('No patient found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      patient: updatedPatient,
    },
  });
});

exports.updateWallet = catchAsync(async (req, res, next) => {
  const patientId = req.params.patientId;



  const patient = await Patient.findById(patientId);
  if (!patient) {
    return next(new AppError('Patient not found', 404));
  }


  await Patient.findByIdAndUpdate(patient._id, {
    wallet: req.body.walletAmount,
  });

  res.status(200).json({
    status: 'success',
  });
});

// Modules.exports = {createPatient}
