import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ setshowlogin, isLoggedIn, setIsLoggedIn }) => {
  const [activeSection, setActiveSection] = useState('Home');
  const location = useLocation();

  const handleScrollLink = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveSection('Home');
    } else if (location.pathname === '/reviews') {
      setActiveSection('UserVoice');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <div className='navbar'>
      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setActiveSection('Home')} className={activeSection === 'Home' ? 'active link-btn' : 'link-btn'}>Home</Link>
        </li>
        <li>
          <button onClick={() => handleScrollLink('reviews')} className={activeSection === 'reviews' ? 'active link-btn' : 'link-btn'}>Review</button>
        </li>
        <li>
          <button onClick={() => handleScrollLink('app-download')} className={activeSection === 'app-download' ? 'active link-btn' : 'link-btn'}>Mobile-App</button>
        </li>
        <li>
          <button onClick={() => handleScrollLink('footer')} className={activeSection === 'footer' ? 'active link-btn' : 'link-btn'}>Contact Us</button>
        </li>
        <li>
          <Link to="/reviews" onClick={() => setActiveSection('UserVoice')} className={activeSection === 'UserVoice' ? 'active link-btn' : 'link-btn'}>UserVoice</Link>
        </li>
      </ul>

      {isLoggedIn ? (
        <button className="signin-btn" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="signin-btn" onClick={() => setshowlogin(true)}>Sign In</button>
      )}
    </div>
  );
};

export default Navbar;
