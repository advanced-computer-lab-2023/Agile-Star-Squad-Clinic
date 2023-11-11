// #Task route solution

const stripe = require('stripe')('sk_test_51O9YaUIM4ONA4Exm7TJdbad0dX5MROUOQMOHOzBf4t7wWoCiC5zrfgIxdAphSnEoVirAACoGLU4MOos1b4qnPQgV001zaZC11m');
const express = require('express');

const YOUR_DOMAIN = 'http://localhost:3000';

const addPayment = async (req, res) => {
    console.log('addPayment controller triggered');
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 1000,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
    
      res.redirect(303, session.url);
}
module.exports = {
  addPayment,
};

// This is your test secret API key.

