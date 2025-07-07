// server/models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  review: String,
});

export default mongoose.model("Review", reviewSchema);

