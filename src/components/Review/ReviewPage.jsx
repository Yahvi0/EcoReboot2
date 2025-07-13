// ReviewPage.jsx
import React from 'react';
import './ReviewPage.css';
import StatsCard from './StatsCard';
import Badges from './Badges';
import Leaderboard from './Leaderboard';
import QuoteBox from './QuoteBox';
import Timeline from './Timeline';
import ShareCard from './ShareCard';
import ProgressBar from './ProgressBar';        // ✅ New
import ClaimRewards from './ClaimRewards';      // ✅ New

const ReviewPage = () => {
  return (
    <div className="review-page">
      <h1>Your EcoReboot Journey 🌿</h1>
      <ProgressBar />       {/* New */}
      <StatsCard />
      <Badges />
      <Leaderboard />
      <QuoteBox />
      <Timeline />
      <ClaimRewards />      {/* New */}
      <ShareCard />
    </div>
  );
};

export default ReviewPage;


ReviewPage.jsx

