import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='navbar'>
      <img src={assets.logo1} alt="Logo" className='logo' />

      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <a href='#reviews' onClick={() => setMenu("Review")} className={menu === "Review" ? "active" : ""}>Review</a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
        </li>
      </ul>

      <button onClick={() => setShowLogin(true)}>Sign In</button>
    </div>
  );
};

export default Navbar;
