import React from "react";
import "./RewardsCard.css";

/* 👉  Explicit imports */
import tree   from "../../assets/tree.webp";
import shirt  from "../../assets/shirt.jpg";
import bottle from "../../assets/bottle.jpeg";

const rewards = [
  { title: "Plant a Tree",    points: 100, img: tree   },
  { title: "Eco T‑shirt",     points: 200, img: shirt  },
  { title: "Reusable Bottle", points: 150, img: bottle },
];

const RewardsCard = () => (
  <section className="rewards-container">
    <h2>🎁 Claim Your Rewards</h2>
    <p>Use your points to support eco‑initiatives</p>

    <div className="reward-list">
      {rewards.map((r) => (
        <div key={r.title} className="reward-card">
          <img src={r.img} alt={r.title} className="reward-img" />
          <h3>{r.title}</h3>
          <p>{r.points} pts</p>
          <button>Claim</button>
        </div>
      ))}
    </div>
  </section>
);

export default RewardsCard;
