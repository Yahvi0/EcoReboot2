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

import play_store from "../../assets/play_store.png";
import app_store from "../../assets/app_store.png";

const CO2_PER_KM = 0.23;
const IDLE_CO2_PER_MIN = 0.02;
const FUEL_PER_KM = 0.08;
const FUEL_PRICE = 100;

const Header = ({ setshowlogin, isLoggedIn, setIsLoggedIn }) => {

  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  /* ───────────────────── Scroll reveal ───────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById("about-section");
      const chart = document.getElementById("co2-chart-section");

      if (about && about.getBoundingClientRect().top < window.innerHeight - 150)
        setShowAbout(true);

      if (chart && chart.getBoundingClientRect().top < window.innerHeight - 150)
        setShowChart(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <>
      {/* Fixed top‑nav */}
      <Navbar 
  setshowlogin={setshowlogin}
  isLoggedIn={isLoggedIn}
  setIsLoggedIn={setIsLoggedIn}
/>


      {/* ───── Hero / video banner ───── */}
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
            If Earth had a wishlist, this would be on it. <br />
            Rethink. Replan. Reboot.
          </p>
        </div>
      </div>

      {/* ───── About ───── */}
      <div id="about-section" className={`about-section ${showAbout ? "show" : ""}`}>
        <div className="about-content">
          <h2>About EcoReboot</h2>
          <p>
            EcoReboot empowers individuals and retailers to plan eco‑friendly routes,
            reduce fuel consumption, cut carbon emissions, and save money.
            Let’s optimize logistics for a greener tomorrow.
          </p>
        </div>

        <div className="feature-grid">
          <div className="grid-box green">🌱 Green Logistics</div>
          <div className="grid-box blue">📍 Route Optimization</div>
          <div className="grid-box orange">💸 Fuel Savings</div>
          <div className="grid-box red">🌎 CO₂ Reduction</div>
        </div>
      </div>

      {/* ───── CTA ───── */}
      <div className="cta-section">
        <h3>Ready to reboot your delivery strategy?</h3>
        <button onClick={() => navigate("/map")} className="cta-btn">
          Get Started
        </button>
      </div>

      {/* ───── Charts ───── */}
      <div id="co2-chart-section" className={`co2-section ${showChart ? "show" : ""}`}>
        <CO2EmissionsChart />
      </div>
      <div className="co2-section show">
        <PredictedCO2BarChart />
      </div>

      {/* ───── How it works ───── */}
      <div className="how-it-works-section">
        <h2>🧠 How It Works</h2>
        <div className="steps-grid">
          {[
            [step1Img, "1️⃣ Enter your route"],
            [step2Img, "📊 See CO₂, fuel & cost  estimates"],
            [step3Img, "🌿 Choose greenest path"],
            [step4Img, "📈 Track and improve"]
          ].map(([img, txt], i) => (
            <div className="step-card" key={i}>
              <img src={img} alt={txt} />
              <h3>{txt}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ───── Savings calculator ───── */}
      <div className="savings-calculator-section">
        <h2>🧮 Estimate Your Savings</h2>
        <p>Enter Distance (km) and Time (mins)</p>
        <input
          type="number"
          placeholder="Distance (km)"
          onChange={(e) => setDistance(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="Time (mins)"
          onChange={(e) => setTime(parseFloat(e.target.value))}
        />

        {distance > 0 && time > 0 && (
          <div className="results">
            <p>
              CO₂ Saved:&nbsp;
              {Math.max((distance * CO2_PER_KM - time * IDLE_CO2_PER_MIN).toFixed(2), 0)} kg
            </p>
            <p>Fuel Saved: {(distance * FUEL_PER_KM).toFixed(2)} L</p>
            <p>Money Saved: ₹{(distance * FUEL_PER_KM * FUEL_PRICE).toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* ───── Audience cards ───── */}
      <div className="who-section">
        <h2>👨‍👩‍👧‍👦 Who It's For</h2>
        <div className="who-cards">
          {[
            [deliveryImg, "Delivery Drivers", "Lower fuel use, better profits."],
            [retailerImg, "E‑commerce Retailers", "Greener, smarter logistics."],
            [shopperImg, "Eco‑conscious Shoppers", "Make every km count."]
          ].map(([img, h, p], i) => (
            <div className="who-card" key={i}>
              <img src={img} alt={h} />
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* impact, mission, facts …  (unchanged sections) */}

      {/* ───── Mobile‑app CTA ───── */}
      <div className="app-download" id="app-download">
        <p>
          For better experience download <br />
          EcoReboot
        </p>
        <div className="app-download-platform">
          <img src={play_store} alt="Play Store" />
          <img src={app_store} alt="App Store" />
        </div>
      </div>

      {/* ───── Contact Us ───── */}
      <div id="contact-section" className="contact-section">
        <h2>📫 Contact Us</h2>

        {/* Person 1 */}
        <div className="contact-card">
          <h3>Pranjal Singh</h3>
          <a href="mailto:pranjaljaypee@gmail.com">pranjaljaypee@gmail.com</a>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/pranjal-singh-618507260/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin" />
            </a>
            <a href="https://www.instagram.com/rain_in_soul30/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>

        {/* Person 2 */}
        <div className="contact-card">
          <h3>Yahvi Chaudhary</h3>
          <a href="mailto:yahvi582@gmail.com">yahvi582@gmail.com</a>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/yahvi-chaudhary-69b579318/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin" />
            </a>
            <a href="https://www.instagram.com/_yahvi05_/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;