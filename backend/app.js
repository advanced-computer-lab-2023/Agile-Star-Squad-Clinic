const express = require('express');
const cors = require('cors');
const morgan= require('morgan')
const env = require("dotenv").config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
const cookieParser = require('cookie-parser');
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
const { resolve } = require("path");

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
app.use(express.static(process.env.STATIC_DIR));
app.use(cors());
app.use(cookieParser());

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

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});
app.use('/admins', adminRouter);
app.use('/admins', middleware.adminAuth, adminRouter);
app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);
app.use('/prescriptions', prescriptionRouter);
app.use('/packages', packageRouter);
app.use('/payments',paymentRouter);
app.use('/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
