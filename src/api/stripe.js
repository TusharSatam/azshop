// This is your test secret API key.

import Stripe from "stripe";

const stripe = new Stripe('sk_test_51JBY5WSFH0H2XJ5NlXHpUUYaoSeLUMpzffxSNR0Y5nTyVUFmy3Xso2xPdIY6jUE7OhOGq18llBexkU8Xchzpu5LN00AQUyaxNl');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

export default async function handler(req, res)  {
    if (req.method === 'POST') {
    try {
    const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1MLQfiSFH0H2XJ5N0Ch5y36j' },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vskyo0km/production/').replace('-jpg', '.jpg');

          return {
            price_data: { 
              currency: 'inr',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/canceled`,
      }





  const session = await stripe.checkout.sessions.create(params);
  res.status(200).json(session);
    }
  catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }

//   res.redirect(303, session.url);
}else{
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
}};

app.listen(3000, () => console.log('Running on port 3000'));