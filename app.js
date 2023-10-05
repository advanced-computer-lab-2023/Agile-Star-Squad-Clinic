const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const AppError = require('./src/data/utils/appError')
const globalErrorHandler = require('./src/data/controllers/errorController');
const adminRouter = require('./src/data/routes/adminRoutes');
const patientRouter = require('./src/data/routes/patientRoutes');
const doctorRouter = require('./src/data/routes/doctorRoutes');

// const patientController = require('./controllers/patientController');
// const adminController = require('./controllers/adminController');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
app.use('/admins', adminRouter);
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);

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
