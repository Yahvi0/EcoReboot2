import React, { useState } from 'react';
import './LoginPopUp.css';
import cross_icon from "../../assets/cross_icon.png";

const LoginPopUp = ({ setshowlogin }) => {
  const [currstate, setcurrstate] = useState("Sign Up");

  return (
    <div className='Loginpopup'>
      <form className="loginpopup-container">
        <div className="loginpopup-title">
          <h2>{currstate}</h2>
          <img onClick={() => setshowlogin(false)} src={cross_icon} alt="close" />
        </div>
        <div className="loginpopup-inputs">
          {currstate === "Login" ? null : <input type="text" placeholder='Your Name' required />}
          <input type="email" placeholder='Your email' required />
          <input type="password" placeholder='Your password' required />
        </div>
        <button>{currstate === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="loginpopup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currstate === "Login"
          ? <p>Create a new account? <span onClick={() => setcurrstate("Sign Up")}>Click Here</span></p>
          : <p>Already have an account? <span onClick={() => setcurrstate("Login")}>Login Here</span></p>}
      </form>
    </div>
  );
};

export default LoginPopUp;
