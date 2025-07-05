import React, { useState } from "react";
import "./UserVoice.css";

const initialTestimonials = [
  {
    name: "Aarav Mehta",
    company: "Aarav@gmail.com",
    rating: 5,
    review: "Very efficient and easy to use. Helped reduce travel cost greatly!",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Neha Sharma",
    company: "Neha12_56@gmail.com",
    rating: 4.5,
    review: "The map and route optimization worked perfectly for my daily commute.",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    name: "Rahul Verma",
    company: "rahul_54@gmail.com",
    rating: 4,
    review: "Impressive performance and great UI. Would love more customization options.",
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
  {
    name: "Aditya Desai",
    company: "Aditya_desai@gmail.com",
    rating: 5,
    review: "One of the best eco-routing apps I've come across. Keep it up!",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
  },
];

const UserVoice = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name: formData.name,
      company: formData.email,
      rating: parseFloat(formData.rating),
      review: formData.review,
      img: `https://api.dicebear.com/7.x/thumbs/svg?seed=${formData.name}`,
    };
    setTestimonials([...testimonials, newReview]);
    setFormData({ name: "", email: "", review: "", rating: "" });
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
            <p className="stars">⭐ {t.rating}</p>
            <h4 className="title">Amazing Experience</h4>
            <p className="message">{t.review}</p>
          </div>
        ))}
      </div>

      {/* Full-width form at bottom */}
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
      </div>
    </section>
  );
};

export default UserVoice;
