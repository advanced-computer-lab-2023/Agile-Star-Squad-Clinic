// #Task route solution
const Package = require('../models/packageModel');
const { default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const addPackage = async (req, res) => {
  const {
    name,
    pricePerYear,
    doctorSessionDiscount,
    medicineDiscount,
    familyMemberDiscount,
    description,
    dateOfCreation,
  } = req.body;
  const packageId = uuidv4();
  
  const newPackage = new Package({
    packageId: packageId,
    name: name,
    pricePerYear: pricePerYear,
    doctorSessionDiscount: doctorSessionDiscount,
    medicineDiscount: medicineDiscount,
    familyMemberDiscount:familyMemberDiscount,
    description:description,
    dateOfCreation:dateOfCreation,
  });

  try {
    await newPackage.save();
    res.status(201).json({ sucess: true });
  } catch (error) {
    console.error('ERROR adding package', error);
    res.status(500).json({ error: 'Failed to add package' });
  }
};

const getPackages = async (req, res) => { //lists all packages
  try {
    const allPackages = await Package.find();
    res.status(200).json(allPackages);
  } catch (error) {
    console.error('ERROR retrieving packages', error);
    res.status(500).json({ error: 'Failed to retrieve packages' });
  }
};

const editPackage = async (req, res) => {
  
};

const deletePackage = async (req, res) => {
  
};

module.exports = { addPackage, getPackages, editPackage, deletePackage };
