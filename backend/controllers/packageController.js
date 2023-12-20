// #Task route solution
const Package = require('../models/packageModel');
const { default: mongoose } = require('mongoose');
const AppError = require('../utils/appError');

const addPackage = async (req, res) => {
  const newPackage = await Package.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      package: newPackage,
    },
  });
  
};

const getPackages = async (req, res) => {
  //lists all packages
  try {
    const allPackages = await Package.find();
    res.status(200).json(allPackages);
  } catch (error) {
    console.error('ERROR retrieving packages', error);
    res.status(500).json({ error: 'Failed to retrieve packages' });
  }
};
const getPackage = async (req, res) => {
  const package = await Package.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      package,
    },
  });
};
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const editPackage = async (req, res) => {
  const editedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      package: editedPackage,
    },
  });
};

const deletePackage = async (req, res, next) => {
  const package = await Package.findByIdAndDelete(req.params.id);
  if (!package) {
    return next(new AppError('No package found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  addPackage,
  getPackages,
  getPackage,
  editPackage,
  deletePackage,
};
