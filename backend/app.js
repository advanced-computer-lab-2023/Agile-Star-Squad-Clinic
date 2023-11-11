const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51O9YaUIM4ONA4Exm7TJdbad0dX5MROUOQMOHOzBf4t7wWoCiC5zrfgIxdAphSnEoVirAACoGLU4MOos1b4qnPQgV001zaZC11m');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');
const patientRouter = require('./routes/patientRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const prescriptionRouter = require('./routes/prescriptionRoutes');
const packageRouter = require('./routes/packageRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const Prescription = require('./models/prescriptionModel');
const patientController = require('./controllers/patientController');
const {
  addPackage,
  getPackages,
  editPackage,
  deletePackage,
} = require('./controllers/packageController');

// const patientController = require('./controllers/patientController');
// const adminController = require('./controllers/adminController');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/admins', adminRouter);
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/prescriptions', prescriptionRouter);
app.use('/packages', packageRouter);
app.use('/payments',paymentRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});
// app.all('*', (req, res, next) =>{
//     res.status(404).json({
//         status:'fail',
//         messaage:`Can't find ${req.originalUrl} on this server!`
//     })
// })

app.use(globalErrorHandler);

module.exports = app;
