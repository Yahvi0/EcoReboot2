// ClaimRewards.jsx
import React from "react";
import "./ClaimRewards.css";

/* Images live in public/images/  */
const rewards = [
  { title: "Plant a Tree",    points: 100, img: "/images/tree.jpg"   },
  { title: "Eco T‑shirt",     points: 200, img: "/images/shirt.jpg"  },
  { title: "Reusable Bottle", points: 150, img: "/images/bottle.jpg" }
];

const ClaimRewards = () => (
  <section className="rewards-container">
    <h2>🎁 Claim Your Rewards</h2>
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

export default ClaimRewards;
