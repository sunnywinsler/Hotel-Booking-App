import express from 'express';
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings,
  stripePayment,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

// Route to check room availability (no auth needed)
bookingRouter.post('/check-availability', checkAvailabilityAPI);

// Route to create a booking (protected)
bookingRouter.post('/book', protect, createBooking);

// Route to get all bookings for a user (protected)
bookingRouter.get('/user', protect, getUserBookings);

// Route to get all bookings for a hotel (protected)
bookingRouter.get('/hotel', protect, getHotelBookings);

bookingRouter.post('/stripe-payment',protect,stripePayment);

export default bookingRouter;
