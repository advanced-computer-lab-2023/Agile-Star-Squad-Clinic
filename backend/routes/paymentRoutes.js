const express = require('express');
const patientController = require('../controllers/patientController');
const doctorRouter = require('./doctorRoutes');
const paymentController = require('../controllers/paymentController')


const router = express.Router();

router
  .route('/create-checkout-session')
  .post(paymentController.addPayment);
  
  console.log('Payment route configured');
module.exports = router;