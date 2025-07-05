import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='header'>
            <div className="header-content">
                <h2>Sustainability: Not a trend, a necessity.</h2>
                <p>Let's start your journey towards a greener planet! If Earth had a wishlist, this would be on it.</p>
                <button onClick={() => navigate("/start")} className="start-btn">
                    Start Now
                </button>
            </div>
        </div>
  )
}

export default Header

