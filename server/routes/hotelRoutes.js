// routes/hotelRoutes.js

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

// Route to register a hotel (POST /api/hotels)
hotelRouter.post("/", protect, registerHotel);

export default hotelRouter;
