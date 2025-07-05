import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import Navbar from "../Navbar/Navbar";
import CO2EmissionsChart from "../CO2EmissionsChart";
import PredictedCO2BarChart from '../PredictedCO2Chart';


const Header = () => {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showChart, setShowChart] = useState(false);

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
            If Earth had a wishlist, this would be on it. Rethink. Replan.
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
    </>
  );
};

export default Header;
