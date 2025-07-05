// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import UserVoice from "./components/UserVoice/UserVoice";
import NewPage from "./pages/StartButton/StartButton";
import MapComponent from "./components/Map/MapComponent";
import ChatBot from "./components/Chatbot/ChatBot";
// import Footer from './components/Footer/Footer'; // Optional

const App = () => {
  // Example sustainability stats (you can replace with context or API calls)
  const sustainabilityStats = {
    totalDistance: 125, // km
    totalFuelSaved: 8.5, // litres
    totalCO2Reduced: 21.4, // kg
    totalMoneySaved: 312, // INR
  };
  return (
    <div className="app">
      {/* ✅ Navbar shows on ALL pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/start" element={<NewPage />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="/reviews" element={<UserVoice />} />
      </Routes>
      <ChatBot stats={sustainabilityStats} />

      {/* Footer can also be global if needed */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
