// src/components/UserVoice/UserVoice.jsx
import React from "react";
import "./UserVoice.css";

const testimonials = [
  {
    name: "Aarav Mehta",
    company: "TCS",
    rating: 5,
    review: "Very efficient and easy to use. Helped reduce travel cost greatly!",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Neha Sharma",
    company: "Infosys",
    rating: 4.5,
    review: "The map and route optimization worked perfectly for my daily commute.",
    img: "https://randomuser.me/api/portraits/women/57.jpg",
  },
  {
    name: "Rahul Verma",
    company: "Wipro",
    rating: 4,
    review: "Impressive performance and great UI. Would love more customization options.",
    img: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    name: "Priya Iyer",
    company: "Accenture",
    rating: 5,
    review: "Loved how eco-conscious and accurate this tool is. Great job!",
    img: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Karan Patel",
    company: "HCL",
    rating: 4.7,
    review: "Very practical and well-thought-out interface. Smooth experience.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ishita Rao",
    company: "Tech Mahindra",
    rating: 4.8,
    review: "Clean layout, fast load times, and solid performance overall.",
    img: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    name: "Aditya Desai",
    company: "Capgemini",
    rating: 5,
    review: "One of the best eco-routing apps I've come across. Keep it up!",
    img: "https://randomuser.me/api/portraits/men/48.jpg",
  },
];

const UserVoice = () => {
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
            <h4 className="title">Amazing Template</h4>
            <p className="message">{t.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserVoice;
