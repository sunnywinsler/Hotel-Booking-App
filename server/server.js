import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();
connectDB();

// Enable Cross-Origin Resource Sharing
app.use(express.json())
app.use(cors());
app.use(clerkMiddleware())
app.use("/api/clerk",clerkWebhooks);

app.get('/', (req, res) => res.send("API is working Fine"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
