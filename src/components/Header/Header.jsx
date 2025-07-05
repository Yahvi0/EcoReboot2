import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import Navbar from "../Navbar/Navbar";
import CO2EmissionsChart from "../CO2EmissionsChart";
import PredictedCO2BarChart from "../PredictedCO2Chart";
import deliveryImg from "../../assets/deliveryImg.jpg";
import retailerImg from "../../assets/retailerImg.jpg";
import shopperImg from "../../assets/shopperImg.jpg";






const Header = () => {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById("about-section");
      const chart = document.getElementById("co2-chart-section");

      if (about) {
        const rect = about.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          setShowAbout(true);
        }
      }

      if (chart) {
        const rect = chart.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          setShowChart(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="header">
        <video autoPlay muted loop className="bg-video">
          <source src="/public/sustainable-retail.mp4" type="video/mp4" />
        </video>
        <div className="overlay" />

        <div className="header-topbar">
          <img src={logo} alt="EcoReboot Logo" className="header-logo" />
          <div className="header-branding">
            <h1>EcoReboot</h1>
            <p>Sustainability: Not a trend, a necessity.</p>
          </div>
        </div>

        <Navbar />

        <div className="header-content">
          <p>
            If Earth had a wishlist, this would be on it. <br /> Rethink. Replan.
            Reboot.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about-section"
        className={`about-section ${showAbout ? "show" : ""}`}
      >
        <div className="about-content">
          <h2>About EcoReboot</h2>
          <p>
            EcoReboot empowers individuals and retailers to plan eco-friendly
            routes, reduce fuel consumption, cut carbon emissions, and save
            money. Let’s optimize logistics for a greener tomorrow.
          </p>
        </div>

        <div className="feature-grid">
          <div className="grid-box green">🌱 Green Logistics</div>
          <div className="grid-box blue">📍 Route Optimization</div>
          <div className="grid-box orange">💸 Fuel Savings</div>
          <div className="grid-box red">🌎 CO₂ Reduction</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h3>Ready to reboot your delivery strategy?</h3>
        <button onClick={() => navigate("/start")} className="cta-btn">
          Get Started
        </button>
      </div>

      {/* CO2 Chart Section */}
      <div
        id="co2-chart-section"
        className={`co2-section ${showChart ? "show" : ""}`}
      >
        <CO2EmissionsChart />
      </div>
      <div className="co2-section show">
        <PredictedCO2BarChart />
      </div>

      {/* How It Works */}
      <div className="how-it-works-section">
        <h2>🧠 How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">1️⃣ Enter your route</div>
          <div className="step-card">📊 See CO₂, fuel & cost estimates</div>
          <div className="step-card">🌿 Choose greenest path</div>
          <div className="step-card">📈 Track and improve</div>
        </div>
      </div>

      {/* Real-Time Savings Calculator */}
      <div className="savings-calculator-section">
        <h2>🧮 Estimate Your Savings</h2>
        <p>Enter Distance (in km) and Time (in mins)</p>
        <input
          type="number"
          placeholder="Distance (km)"
          onChange={(e) => setDistance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (mins)"
          onChange={(e) => setTime(e.target.value)}
        />
        <div className="results">
          <p>CO₂ Saved: {(distance * 0.23).toFixed(2)} kg</p>
          <p>Fuel Saved: {(distance * 0.08).toFixed(2)} L</p>
          <p>Money Saved: ₹{(distance * 7).toFixed(2)}</p>
        </div>
      </div>

      {/* Who It’s For */}

<div className="who-section">
  <h2>👨‍👩‍👧‍👦 Who It's For</h2>
  <div className="who-cards">
    <div className="who-card">
      <img src={deliveryImg} alt="Delivery Drivers" />
      <h3>Delivery Drivers</h3>
      <p>Lower fuel use, better profits.</p>
    </div>

    <div className="who-card">
      <img src={retailerImg} alt="E-commerce Retailers" />
      <h3>E-commerce Retailers</h3>
      <p>Greener, smarter logistics.</p>
    </div>

    <div className="who-card">
      <img src={shopperImg} alt="Eco-conscious Shoppers" />
      <h3>Eco-conscious Shoppers</h3>
      <p>Make every km count.</p>
    </div>
  </div>
</div>

      {/* App Preview */}
      <div className="app-preview">
        <h2>📱 Mobile App Preview</h2>
        <img src="/assets/app-mockup.png" alt="App preview" className="app-mockup" />
        <p>Coming Soon to Play Store & App Store</p>
      </div>

      {/* Eco Impact Stats */}
      <div className="impact-counter">
        <h2>📈 Our Impact So Far</h2>
        <div className="counter-grid">
          <div><strong>5,320+</strong><p>Users</p></div>
          <div><strong>1.2M km</strong><p>Optimized</p></div>
          <div><strong>276 tons</strong><p>CO₂ Saved</p></div>
          <div><strong>₹12.4L+</strong><p>Saved</p></div>
        </div>
      </div>

      {/* Goals & Vision */}
      <div className="vision-section">
        <h2>🎯 Our Mission</h2>
        <p>
          By 2030, EcoReboot aims to help reduce 10 million tons of CO₂ through
          smart retail and delivery solutions — aligned with UN Sustainable
          Development Goals (SDGs).
        </p>
      </div>

      {/* Did You Know Facts */}
      <div className="facts-section">
        <h2>🧠 Did You Know?</h2>
        <ul>
          <li>🔥 1 liter of fuel emits 2.3 kg of CO₂</li>
          <li>🚚 Route optimization reduces delivery emissions by 15–30%</li>
        </ul>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>📞 Contact Us</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default Header;
