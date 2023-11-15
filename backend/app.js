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
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.post('/create-checkout-session',async(req,res)=>{
// const session = await stripe.checkout.sessions.create({
//   mode: 'subscription',
//   line_items: [
//     {
//       price: 'price_1OCTWdIM4ONA4ExmtbEzehsU',
//       quantity: 1,
//     },
//     {
//       price: 'price_1OCTVzIM4ONA4Exm1DiXv9cI',
//       quantity: 1,
//     },
//     {
//       price: 'price_1OCTVIIM4ONA4ExmNsVRD2cZ',
//       quantity: 1,
//     },
//   ],
//   ui_mode: 'embedded',
//   return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}',
// });})
// app.post('/create-customer', async (req, res) => {
//   try {
//     const customer = await stripe.customers.create({
//       email: req.body.email,
//       // Additional customer information
//     });
//     res.status(201).json(customer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// app.post('/create-subscription', async (req, res) => {
//   try {
//     const subscription = await stripe.subscriptions.create({
//       customer: req.body.customerId,
//       items: [{ package: req.body.packageID }], 
//       default_payment_method: req.body.paymentMethodId,
//       billing: 'auto', // Auto-renewal
//       // Other subscription parameters
//     });
//     res.status(201).json(subscription);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Webhook endpoint to handle events from Stripe (e.g., payment success, failed payments)
// app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_STRIPE_WEBHOOK_SECRET');
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle specific events (e.g., payment success, failed payments) here

//   res.status(200).json({ received: true });
// });
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
    const { patient_id, price } = req.body; 

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: price * 100, 
      payment_method_types: ['card'],
      metadata: {
        patient_id, 
      },
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






