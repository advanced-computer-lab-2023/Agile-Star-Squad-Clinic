const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/resetPassword').get(authController.getOTP);

router
  .route('/resetPassword/:email')
  .get(authController.getUserByEmail)
  .post(authController.forgotPassword);

router.route('/resetPassword/:id').patch(authController.updatePassword);

router.route('/:username/:password').get(authController.logIn);

router.route('/logout').get(authController.logout);

module.exports = router;
