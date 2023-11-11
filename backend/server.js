// const dotenv = require('dotenv');
// const app = require('./app');
// const mongoose = require('mongoose');

// dotenv.config({ path: './config.env' });

// const DB =
// process.env.MONGO_URI;
// mongoose.connect(DB).then(() => console.log('DB connected successfully!'));

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
// This is your test secret API key.
const stripe = require('stripe')('sk_test_51O9YaUIM4ONA4Exm7TJdbad0dX5MROUOQMOHOzBf4t7wWoCiC5zrfgIxdAphSnEoVirAACoGLU4MOos1b4qnPQgV001zaZC11m');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1OBJOeIM4ONA4ExmUdFcnKOT',
        quantity: 1,
      },{
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1OBJOeIM4ONA4ExmUdFcnKOT',
        quantity: 2,
      }
    ],
    mode: 'payment',
    
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
