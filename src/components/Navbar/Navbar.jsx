import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setshowlogin }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const location = useLocation();

  const handleScrollLink = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  /* highlight the active nav item when the route changes */
  useEffect(() => {
    if (location.pathname === "/") setActiveSection("Home");
    else if (location.pathname === "/reviews") setActiveSection("UserVoice");
    else if (location.pathname === "/impact") setActiveSection("impact");
  }, [location]);

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        {/* HOME (route) */}
        <li>
          <Link
            to="/"
            onClick={() => setActiveSection("Home")}
            className={activeSection === "Home" ? "active link-btn" : "link-btn"}
          >
            Home
          </Link>
        </li>

        {/* REVIEW (now navigates to /impact) */}
        <li>
          <Link
            to="/impact"
            onClick={() => setActiveSection("impact")}
            className={activeSection === "impact" ? "active link-btn" : "link-btn"}
          >
            Review
          </Link>
        </li>

        {/* MOBILE APP (scroll inside home) */}
        <li>
          <button
            onClick={() => handleScrollLink("app-download")}
            className={activeSection === "app-download" ? "active link-btn" : "link-btn"}
          >
            Mobile‑App
          </button>
        </li>

        {/* CONTACT US (scroll inside home) */}
        <li>
          <button
            onClick={() => handleScrollLink("contact-section")}
            className={activeSection === "contact-section" ? "active link-btn" : "link-btn"}
          >
            Contact Us
          </button>
        </li>

        {/* USERVOICE (separate route) */}
        <li>
          <Link
            to="/reviews"
            onClick={() => setActiveSection("UserVoice")}
            className={activeSection === "UserVoice" ? "active link-btn" : "link-btn"}
          >
            UserVoice
          </Link>
        </li>
      </ul>

      {/* SIGN‑IN button */}
      <button className="signin-btn" onClick={() => setshowlogin(true)}>
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
