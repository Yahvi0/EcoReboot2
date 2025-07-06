// StartButton.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/map');
  }, [navigate]);

  return null; // 👋 No UI needed anymore
};

export default NewPage;
