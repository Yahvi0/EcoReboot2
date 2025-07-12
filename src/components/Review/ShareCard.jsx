import React from 'react';
import './ShareCard.css';

const ShareCard = () => {
  return (
    <div className="share-card">
      <h3>🎉 Share your progress!</h3>
      <button onClick={() => alert('Shared to LinkedIn!')}>Share to LinkedIn</button>
    </div>
  );
};

export default ShareCard;

