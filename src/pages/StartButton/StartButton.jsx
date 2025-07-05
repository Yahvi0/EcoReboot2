// StartButton.jsx
import React from 'react';
import './StartButton.css';
import { useNavigate } from 'react-router-dom';  

const NewPage = () => {
  const navigate = useNavigate(); 

  const handleStart = () => {
    navigate('/map'); 
  };

  return (
    <div className="background">
      <button className="button1" onClick={handleStart}>
        Let's get started!
      </button>
    </div>
  );
};

export default NewPage;
