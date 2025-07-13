// ProgressBar.jsx
import React from "react";
import CountUp from "react-countup";
import "./ProgressBar.css";

const ProgressBar = ({ percentage = 0 }) => {
  const safePercent = Math.min(Math.max(percentage, 40), 100);

  const getEmoji = (p) => {
    if (p >= 100) return "🌍🥇";
    if (p >= 75) return "🌱🏆";
    if (p >= 50) return "🍃🎯";
    if (p >= 25) return "🪴✨";
    return "🌿🚶‍♀️";
  };

  return (
    <div className="progress-bar">
      <h2 style={{ fontWeight: "600", fontSize: "24px", marginBottom: "8px" }}>
        🌿 Your EcoReboot Journey <span>{getEmoji(safePercent)}</span>
      </h2>

      <div className="progress-label">🌱 Your Green Impact Progress</div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${safePercent}%`,
            background: "linear-gradient(to right, #4caf50, #8bc34a, #cddc39)",
            transition: "width 0.6s ease-in-out",
          }}
        />
      </div>

      <div className="progress-text" style={{ fontWeight: "bold", color: "#2e7d32" }}>
        <CountUp end={safePercent} duration={1} decimals={0} />%
      </div>
    </div>
  );
};

export default ProgressBar;
