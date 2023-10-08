const express = require('express');
const packageController = require('../controllers/packageController');

const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(packageController.getPackages)
  .post(packageController.addPackage);

// router
//   .route('/:id')
//   .get(doctorController.getDoctor)
//   .patch(doctorController.updateDoctor)
//   .delete(doctorController.removeDoctor);

module.exports = router;