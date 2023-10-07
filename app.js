const express = require('express');
const dotenv = require('dotenv');


const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');
const patientRouter = require('./routes/patientRoutes');
const doctorRouter = require('./routes/doctorRoutes');

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
