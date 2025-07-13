// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Header from "./components/Header/Header";
// import UserVoice from "./components/UserVoice/UserVoice";
// import NewPage from "./pages/StartButton/StartButton";
// import MapComponent from "./components/Map/MapComponent";
// import ChatBot from "./components/Chatbot/ChatBot";
// import LoginPopUp from "./components/LoginPopUp/LoginPopUp";

// const App = () => {
//   const [showlogin, setshowlogin] = useState(false);

//   const sustainabilityStats = {
//     totalDistance: 124,
//     totalFuelSaved: 32,
//     totalCO2Reduced: 88,
//     totalMoneySaved: 1500
//   };

//   return (
//     <>
//     {showlogin?<LoginPopUp setshowlogin={setshowlogin}/>:<></>}

//       <div className="app">
//         <Navbar setshowlogin={setshowlogin} />

//         <Routes>
//           <Route path="/" element={<Header />} />
//           <Route path="/start" element={<NewPage />} />
//           <Route path="/map" element={<MapComponent />} />
//           <Route path="/reviews" element={<UserVoice />} />
//         </Routes>

//         <ChatBot stats={sustainabilityStats} />
//       </div>
//     </>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import UserVoice from "./components/UserVoice/UserVoice";
import NewPage from "./pages/StartButton/StartButton";
import MapComponent from "./components/Map/MapComponent";
import ChatBot from "./components/Chatbot/ChatBot";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";

const App = () => {
  const [showlogin, setshowlogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sustainabilityStats = {
    totalDistance: 124,
    totalFuelSaved: 32,
    totalCO2Reduced: 88,
    totalMoneySaved: 1500,
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {showlogin && <LoginPopUp setshowlogin={setshowlogin} setIsLoggedIn={setIsLoggedIn} />}

      <div className="app">
        <Navbar setshowlogin={setshowlogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/start" element={<NewPage />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/reviews" element={<UserVoice />} />
        </Routes>

        <ChatBot stats={sustainabilityStats} />
      </div>
    </>
  );
};

export default App;
