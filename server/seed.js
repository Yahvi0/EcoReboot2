// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Review from "./models/Review.js";

dotenv.config();

const seedReviews = [
  {
    name: "Aarav Mehta",
    email: "aarav@gmail.com",
    rating: 5,
    review: "Very efficient and easy to use. Helped reduce travel cost greatly!",
  },
  {
    name: "Neha Sharma",
    email: "neha12_56@gmail.com",
    rating: 4.5,
    review: "The map and route optimization worked perfectly for my daily commute.",
  },
  {
    name: "Rahul Verma",
    email: "rahul_54@gmail.com",
    rating: 4,
    review: "Impressive performance and great UI. Would love more customization options.",
  },
  {
    name: "Priya Iyer",
    email: "priya564_876@gmail.com",
    rating: 5,
    review: "Loved how eco-conscious and accurate this tool is. Great job!",
  },
  {
    name: "Karan Patel",
    email: "karan7898@gmail.com",
    rating: 4.7,
    review: "Very practical and well-thought-out interface. Smooth experience.",
  },
  {
    name: "Ishita Rao",
    email: "ishita_67@gmail.com",
    rating: 4.8,
    review: "Clean layout, fast load times, and solid performance overall.",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("🌱 MongoDB connected. Seeding reviews...");
    await Review.deleteMany({});
    await Review.insertMany(seedReviews);
    console.log("✅ Seeding complete!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });
