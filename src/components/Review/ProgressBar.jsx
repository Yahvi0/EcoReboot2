// ProgressBar.jsx
import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ percentage = 0 }) => {
  /* Clamp to 0‑100 just in case */
  const safePercent = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="progress-bar">
      <div className="progress-label">🌱 Your Green Impact Progress</div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${safePercent}%` }}
        />
      </div>

      {/* percentage text */}
      <div className="progress-text">{safePercent}%</div>
    </div>
  );
};

export default ProgressBar;
