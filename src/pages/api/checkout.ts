import { stripe } from '../../plugins/stripe';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://next-stripe-eight.vercel.app/'
    : 'http://localhost:3000';

export default async function handler(req: any, res: any) {
  console.log(
    '🚀 ~ file: checkout.ts:6 ~ handler ~ req.body.customer_id:',
    req.body.customer_id
  );
  const customer = await stripe.customers.retrieve(req.body.customer_id);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: req.body.price_id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    customer: customer.id,
    success_url: url,
    cancel_url: url,
  });
  return res.status(200).json({
    checkout_url: session.url,
  });
}
