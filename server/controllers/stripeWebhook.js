import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.error('Missing bookingId in session metadata.');
    } else {
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: 'Stripe',
      });
    }
  } else {
    console.log('Unhandled event type:', event.type);
  }

  response.json({ received: true });
};
