<<<<<<< HEAD
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
=======
// src/App.jsx
import React, { useState } from "react";
>>>>>>> e683cea6e9393b891dd5be9acfa02e48fe516f7e
import { Routes, Route } from "react-router-dom";

/* Core pages & components */
import Navbar       from "./components/Navbar/Navbar";
import Header       from "./components/Header/Header";
import NewPage      from "./pages/StartButton/StartButton";
import MapComponent from "./components/Map/MapComponent";
import UserVoice    from "./components/UserVoice/UserVoice";
import ChatBot      from "./components/Chatbot/ChatBot";
import LoginPopUp   from "./components/LoginPopUp/LoginPopUp";

/* NEW Review / Impact dashboard  */
import ReviewPage   from "./components/Review/ReviewPage";

const App = () => {
  const [showlogin, setshowlogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Example stats injected into the ChatBot */
  const sustainabilityStats = {
    totalDistance:     124,
    totalFuelSaved:    32,
    totalCO2Reduced:   88,
    totalMoneySaved:   1500
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
<<<<<<< HEAD
      {showlogin && <LoginPopUp setshowlogin={setshowlogin} setIsLoggedIn={setIsLoggedIn} />}

      <div className="app">
        <Navbar setshowlogin={setshowlogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
=======
      {/* Sign‑in modal */}
      {showlogin && <LoginPopUp setshowlogin={setshowlogin} />}

      <div className="app">
        {/* Fixed top‑nav; pass setter so Navbar can open Login modal */}
        <Navbar setshowlogin={setshowlogin} />
>>>>>>> e683cea6e9393b891dd5be9acfa02e48fe516f7e

        <Routes>
          <Route path="/"        element={<Header      />} />
          <Route path="/start"   element={<NewPage     />} />
          <Route path="/map"     element={<MapComponent/>} />
          <Route path="/reviews" element={<UserVoice   />} />

          {/* NEW personalized Impact / Review dashboard */}
          <Route path="/impact"  element={<ReviewPage  />} />
        </Routes>

        <ChatBot stats={sustainabilityStats} />
      </div>
    </>
  );
};

export default App;
