// server/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5183", // or 5179 if that's where Vite is running
    methods: ["GET", "POST"],
    credentials: true,      
  })
);
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ DB Error:", err));

// Root check
app.get("/", (req, res) => {
  res.send("🌱 EcoReboot Backend is Running");
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
