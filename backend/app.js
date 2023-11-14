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
const authRouter = require('./routes/authRoutes');
const {
  addPackage,
  getPackages,
  editPackage,
  deletePackage,
} = require('./controllers/packageController');
const middleware = require('./middleware/middleware.js');

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
app.use('/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
