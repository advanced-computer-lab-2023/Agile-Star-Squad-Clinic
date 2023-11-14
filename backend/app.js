const express = require('express');
const cors = require('cors');
const env = require("dotenv").config({ path: "./config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
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
app.use(express.static(process.env.STATIC_DIR));
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

app.post('/create-customer', async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      // Additional customer information
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/create-subscription', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customerId,
      items: [{ package: req.body.packageID }], 
      default_payment_method: req.body.paymentMethodId,
      billing: 'auto', // Auto-renewal
      // Other subscription parameters
    });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint to handle events from Stripe (e.g., payment success, failed payments)
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_STRIPE_WEBHOOK_SECRET');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific events (e.g., payment success, failed payments) here

  res.status(200).json({ received: true });
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

    // Send publishable key and PaymentIntent details to client
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






