const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');
const patientRouter = require('./routes/patientRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const prescriptionRouter = require('./routes/prescriptionRoutes');
const packageRouter = require('./routes/packageRoutes');
const authController = require('./controllers/authController');
const {
  addPackage,
  getPackages,
  editPackage,
  deletePackage,
} = require('./controllers/packageController');
const middleware = require('./middleware/middleware.js');

// const patientController = require('./controllers/patientController');
// const adminController = require('./controllers/adminController');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true, //to allow sending cookies if any
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/admins', middleware.adminAuth, adminRouter);
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/prescriptions', prescriptionRouter);
app.use('/packages', packageRouter);

app.get('/resetPassword', authController.getOTP);
app.post('/resetPassword/:email', authController.forgotPassword);
app.get('/resetPassword/:email', authController.getUserByEmail);
app.patch('/resetPassword/:id', authController.updatePassword);
app.get('/:username/:password', authController.logIn);
app.get('/logout', authController.logout);
app.get('/role', authController.getRole);

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
