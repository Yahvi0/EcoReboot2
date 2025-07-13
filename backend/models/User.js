import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: { type: Number, default: 0 }, // ✅ NEW FIELD
  searchHistory: [
    {
      start: String,
      end: String,
      stops: [String],
      distance: Number, // ✅ Store this too
      date: { type: Date, default: Date.now }
    }
  ]
});


export const User = mongoose.model("User", userSchema);
