import React from "react";
import "./Timeline.css"; // make sure this file exists!

const events = [
  { date: "Day 1", event: "Signed up on EcoReboot" },
  { date: "Day 3", event: "Saved first 10kg CO₂" },
  { date: "Day 7", event: "Earned Eco Streak badge" },
];

const Timeline = () => {
  return (
    <div className="timeline">
      <h2>📅 Your Green Journey</h2>
      <ul>
        {events.map((e, index) => (
          <li key={index}>
            <span>{e.date}</span> — {e.event}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
