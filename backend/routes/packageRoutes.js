const express = require('express');
const packageController = require('../controllers/packageController');
const middleware = require('../middleware/middleware.js');


const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(middleware.patientAuth,packageController.getPackages)
  .post(middleware.adminAuth, packageController.addPackage);

router
  .route('/:id')
  .get(packageController.getPackage)
  .patch(middleware.adminAuth, packageController.editPackage)
  .delete(middleware.adminAuth, packageController.deletePackage);

module.exports = router;