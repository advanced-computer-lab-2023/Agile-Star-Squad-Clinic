const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router
  .route('/')
  .get(adminController.getAllAdmins)
  .post(adminController.createAdmin);

router
.route('/requests')
.get(adminController.viewAllRequests)
.post(adminController.acceptRequest);

router
  .route('/:id')
  .get(adminController.getAdmin)
  .delete(adminController.removeAdmin);

module.exports = router;
