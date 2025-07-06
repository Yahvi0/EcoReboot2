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
import step1Img from "../../assets/img1.jpg";
import step2Img from "../../assets/img2.jpg";
import step3Img from "../../assets/img3.jpg";
import step4Img from "../../assets/img4.jpg";
import play_store from "../../assets/play_store.png"
import app_store from "../../assets/app_store.png"
const CO2_PER_KM = 0.23; // kg CO2 per km
const IDLE_CO2_PER_MIN = 0.02; // kg CO2 per minute idle
const FUEL_PER_KM = 0.08; // liters per km
const FUEL_PRICE = 100; // ₹ per liter (India average)

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


        <div className="header-content">
          <p>
            If Earth had a wishlist, this would be on it. <br /> Rethink.
            Replan. Reboot.
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
          <div className="step-card">
            <img src={step1Img} alt="Enter Route" />
            <h3>1️⃣ Enter your route</h3>
          </div>
          <div className="step-card">
            <img src={step2Img} alt="CO₂ Estimate" />
            <h3>📊 See CO₂, fuel & cost estimates</h3>
          </div>
          <div className="step-card">
            <img src={step3Img} alt="Choose Path" />
            <h3>🌿 Choose greenest path</h3>
          </div>
          <div className="step-card">
            <img src={step4Img} alt="Track Progress" />
            <h3>📈 Track and improve</h3>
          </div>
        </div>
      </div>

      {/* Real-Time Savings Calculator */}
      <div className="savings-calculator-section">
        <h2>🧮 Estimate Your Savings</h2>
        <p>Enter Distance (in km) and Time (in mins)</p>
        <input
          type="number"
          placeholder="Distance (km)"
          onChange={(e) => setDistance(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="Time (mins)"
          onChange={(e) => setTime(parseFloat(e.target.value))}
        />

        {/* Calculations */}
        <div className="results">
          {distance > 0 && time > 0 && (
            <>
              <p>
                CO₂ Saved:{" "}
                {Math.max((distance * 0.23 - time * 0.02).toFixed(2), 0)} kg
              </p>
              <p>Fuel Saved: {(distance * 0.08).toFixed(2)} L</p>
              <p>Money Saved: ₹{(distance * 0.08 * 100).toFixed(2)}</p>
            </>
          )}
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
      {/* Eco Impact Stats */}
      <div className="impact-counter">
        <h2>📈 Our Impact So Far</h2>
        <div className="counter-grid">
          <div>
            <strong>5,320+</strong>
            <p>Users</p>
          </div>
          <div>
            <strong>1.2M km</strong>
            <p>Optimized</p>
          </div>
          <div>
            <strong>276 tons</strong>
            <p>CO₂ Saved</p>
          </div>
          <div>
            <strong>₹12.4L+</strong>
            <p>Saved</p>
          </div>
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
        <ul className="facts-list">
          <li>
            <span className="fact-icon">🔥</span>1 liter of fuel emits{" "}
            <strong>2.3 kg of CO₂</strong>
          </li>
          <li>
            <span className="fact-icon">🚚</span>
            Route optimization reduces emissions by <strong>15–30%</strong>
          </li>
          <li>
            <span className="fact-icon">🛢️</span>
            Transport accounts for <strong>~25% of global CO₂ emissions</strong>
          </li>
          <li>
            <span className="fact-icon">🌍</span>
            E-commerce deliveries are expected to grow by{" "}
            <strong>78% by 2030</strong>
          </li>
          <li>
            <span className="fact-icon">📦</span>
            Sustainable logistics can reduce{" "}
            <strong>delivery costs by up to 20%</strong>
          </li>
          <li>
            <span className="fact-icon">💡</span>
            Just one optimized route can save{" "}
            <strong>liters of fuel daily</strong>
          </li>
        </ul>
      </div>
{/* mobile-app */}
      <div className='app-download' id='app-download'>
        <p>For better experience download <br />EcoReboot</p>
            <div className="app-download-platform">
              <img src={play_store} alt="" />
              <img src={app_store} alt="" />
            </div>
      </div>

    </>
  );
};

export default Header;
