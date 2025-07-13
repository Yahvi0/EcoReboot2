import React from 'react';
import './Badges.css';

const badges = [
  { title: '🌱 Eco Starter', desc: 'First route optimized' },
  { title: '🚀 Green Streak', desc: '7 days continuous use' },
  { title: '♻️ Route Master', desc: '50+ green deliveries' },
];

const Badges = () => {
  return (
    <div className="badge-container">
      <h2>Achievements & Badges</h2>
      <div className="badge-grid">
        {badges.map((badge, index) => (
          <div key={index} className="badge-card">
            <h3>{badge.title}</h3>
            <p>{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
