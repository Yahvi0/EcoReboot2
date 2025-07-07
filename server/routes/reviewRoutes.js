// server/routes/reviewRoutes.js
import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming review:", req.body); // <-- add this
    const newReview = new Review(req.body);
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Review save failed:", err); // <-- add this
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
