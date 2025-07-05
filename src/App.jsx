// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import UserVoice from './components/UserVoice/UserVoice';
import NewPage from './pages/StartButton/StartButton';
import MapComponent from './components/Map/MapComponent';
// import Footer from './components/Footer/Footer'; // Optional

const App = () => {
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

      {/* Footer can also be global if needed */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
