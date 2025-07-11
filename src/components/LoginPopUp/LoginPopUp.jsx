import React, { useState } from 'react';
import './LoginPopUp.css';
import cross_icon from "../../assets/cross_icon.png";
import axios from 'axios';

const LoginPopUp = ({ setshowlogin }) => {
  const [currstate, setcurrstate] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = currstate === "Sign Up" ? "http://localhost:4000/api/auth/register" : "http://localhost:4000/api/auth/login";

    const payload = currstate === "Sign Up" ? { name, email, password } : { email, password };

    try {
      const res = await axios.post(url, payload);
      alert(res.data.message);
      setshowlogin(false);
    } catch (err) {
      alert(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className='Loginpopup'>
      <form className="loginpopup-container" onSubmit={handleSubmit}>
        <div className="loginpopup-title">
          <h2>{currstate}</h2>
          <img onClick={() => setshowlogin(false)} src={cross_icon} alt="close" />
        </div>
        <div className="loginpopup-inputs">
          {currstate === "Login" ? null : (
            <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Your Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{currstate === "Sign Up" ? "Create Account" : "Login"}</button>
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
