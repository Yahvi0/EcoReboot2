import React, { useEffect, useState } from "react";
import "./UserVoice.css";
import axios from "axios";

const initialTestimonials = [
  {
    name: "Aarav Mehta",
    company: "Aarav@gmail.com",
    rating: 5,
    review:
      "Very efficient and easy to use. Helped reduce travel cost greatly!",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Neha Sharma",
    company: "Neha12_56@gmail.com",
    rating: 4.5,
    review:
      "The map and route optimization worked perfectly for my daily commute.",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    name: "Rahul Verma",
    company: "rahul_54@gmail.com",
    rating: 4,
    review:
      "Impressive performance and great UI. Would love more customization options.",
    img: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    name: "Priya Iyer",
    company: "Priya564_876@gmail.com",
    rating: 5,
    review: "Loved how eco-conscious and accurate this tool is. Great job!",
    img: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Karan Patel",
    company: "karan7898@gmail.com",
    rating: 4.7,
    review: "Very practical and well-thought-out interface. Smooth experience.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ishita Rao",
    company: "Ishit_67@gmail.com",
    rating: 4.8,
    review: "Clean layout, fast load times, and solid performance overall.",
    img: "https://randomuser.me/api/portraits/women/15.jpg",
  },
];

const UserVoice = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reviews")
      .then((res) => {
        const updated = res.data.map((r) => ({
          name: r.name,
          company: r.email,
          rating: r.rating,
          review: r.review,
          img: `https://api.dicebear.com/7.x/thumbs/svg?seed=${r.name}`,
        }));
        setTestimonials((prev) => [...prev, ...updated]);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      name: formData.name,
      company: formData.email,
      rating: parseFloat(formData.rating),
      review: formData.review,
      img: `https://api.dicebear.com/7.x/thumbs/svg?seed=${formData.name}`,
    };

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        review: formData.review,
      });
      setTestimonials([...testimonials, newReview]);
      setFormData({ name: "", email: "", rating: 5, review: "" });
      setSuccessMessage("✅ Thank you! Your review has been submitted.");
      setTimeout(() => setSuccessMessage(""), 3000); // Auto hide
    } catch (err) {
      console.error("Submission failed:", err);
      setSuccessMessage("❌ Something went wrong. Try again!");
    }
  };

  return (
    <section className="uservoice">
      <h2>Customer Reviews</h2>
      <p className="subtitle">What our users say about EcoReboot</p>

      <div className="review-container">
        {testimonials.map((t, index) => (
          <div className="review-card fade-in" key={index}>
            <div className="profile">
              <img src={t.img} alt={t.name} />
              <div>
                <h3>{t.name}</h3>
                <p>{t.company}</p>
              </div>
            </div>
            <div className="stars">
              {[...Array(5)].map((_, i) => {
                const rating = t.rating;
                const filled = i + 1 <= Math.floor(rating);
                const half = rating > i && rating < i + 1;
                return (
                  <span
                    key={i}
                    className={`star ${filled ? "filled" : ""} ${
                      half ? "half" : ""
                    }`}
                  >
                    ★
                  </span>
                );
              })}
              <span className="rating-number">({t.rating})</span>
            </div>
            <h4 className="title">Amazing Experience</h4>
            <p className="message">{t.review}</p>
          </div>
        ))}
      </div>

      {/* Review Submission Form */}
      <div className="review-form-section">
        <h2>📝 Leave a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="review"
            placeholder="Your Review"
            value={formData.review}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1–5)"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
          <button type="submit">Submit</button>
        </form>

        {/* ✅ Success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </section>
  );
};

export default UserVoice;
