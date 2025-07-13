import React from 'react';
import './Leaderboard.css';

const users = [
  { name: 'Yahvi', saved: '102kg CO₂' },
  { name: 'Pranjal', saved: '89kg CO₂' },
  { name: 'Riya', saved: '75kg CO₂' },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <h2>🌍 Global Green Leaderboard</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>#{index + 1}</strong> {user.name} — {user.saved}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
