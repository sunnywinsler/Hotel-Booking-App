import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Webhook Route
app.use("/api/clerk", clerkWebhooks);

// Default Route
app.get("/", (req, res) => res.send("API is working fine"));
app.use('/api/user',userRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
