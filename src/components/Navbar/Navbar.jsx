// Navbar.jsx
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setshowlogin, isLoggedIn, setIsLoggedIn }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") setActiveSection("Home");
    else if (location.pathname === "/reviews") setActiveSection("UserVoice");
    else if (location.pathname === "/impact") setActiveSection("Impact");
    else if (location.pathname === "/map") setActiveSection("Map");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const handleScrollLink = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

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
          <Link
            to="/impact"
            onClick={() => setActiveSection("Impact")}
            className={activeSection === "Impact" ? "active link-btn" : "link-btn"}
          >
            Review
          </Link>
        </li>

        <li>
          <Link
            to="/map"
            onClick={() => setActiveSection("Map")}
            className={activeSection === "Map" ? "active link-btn" : "link-btn"}
          >
            Map
          </Link>
        </li>

        <li>
          <button
            onClick={() => handleScrollLink("app-download")}
            className={
              activeSection === "app-download" ? "active link-btn" : "link-btn"
            }
          >
            Mobile-App
          </button>
        </li>

        <li>
          <button
            onClick={() => handleScrollLink("contact-section")}
            className={
              activeSection === "contact-section" ? "active link-btn" : "link-btn"
            }
          >
            Contact Us
          </button>
        </li>

        <li>
          <Link
            to="/reviews"
            onClick={() => setActiveSection("UserVoice")}
            className={
              activeSection === "UserVoice" ? "active link-btn" : "link-btn"
            }
          >
            UserVoice
          </Link>
        </li>
      </ul>

      {isLoggedIn ? (
        <button className="signin-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button
          className="signin-btn"
          onClick={() => setshowlogin(true)}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
