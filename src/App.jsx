import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import NewPage from './pages/StartButton/StartButton';
import MapComponent from './components/Map/MapComponent'; 
import UserVoice from './components/UserVoice/UserVoice';


function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<NewPage />} />
        <Route path="/map" element={<MapComponent />} /> 
        <Route path="/reviews" element={<UserVoice />} />

      </Routes>
    </div>
  );
}

export default App;
