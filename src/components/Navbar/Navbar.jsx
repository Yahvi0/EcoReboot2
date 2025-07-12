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

  /* highlight when route changes */
  useEffect(() => {
    if (location.pathname === "/") setActiveSection("Home");
    else if (location.pathname === "/reviews") setActiveSection("UserVoice");
  }, [location]);

  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setActiveSection("Home")}
            className={activeSection === "Home" ? "active link-btn" : "link-btn"}
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => handleScrollLink("reviews")}
            className={activeSection === "reviews" ? "active link-btn" : "link-btn"}
          >
            Review
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollLink("app-download")}
            className={activeSection === "app-download" ? "active link-btn" : "link-btn"}
          >
            Mobile-App
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollLink("contact-section")}
            className={activeSection === "contact-section" ? "active link-btn" : "link-btn"}
          >
            Contact Us
          </button>
        </li>
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

      <button className="signin-btn" onClick={() => setshowlogin(true)}>
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
