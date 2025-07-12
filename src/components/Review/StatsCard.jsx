import React from "react";
import "./StatsCard.css";

const StatsCard = () => {
  const stats = [
    { label: "Total CO₂ Saved",   value: "278 tons"  },
    { label: "Fuel Saved",        value: "1.15 k Liters" },
    { label: "Money Saved",       value: "₹12.4 L+" },
    { label: "Routes Optimized",  value: "1.3 M+"   }
  ];

  return (
    <div className="stats-card">
      {stats.map((s, idx) => (
        <div key={idx} className="stat-box">
          <h2>{s.value}</h2>
          <p>{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
