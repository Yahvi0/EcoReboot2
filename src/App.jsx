// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import ReviewPage from "./components/Review/ReviewPage";
// import Header from "./components/Header/Header";
// import MapComponent from "./components/Map/MapComponent";

// const App = () => {
//   const [showlogin, setshowlogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   return (
//     <>
//       {showlogin && (
//         <LoginPopUp setshowlogin={setshowlogin} setIsLoggedIn={setIsLoggedIn} />
//       )}
//       <Navbar
//         setshowlogin={setshowlogin}
//         isLoggedIn={isLoggedIn}
//         setIsLoggedIn={setIsLoggedIn}
//       />

//       <Routes>
//         <Route
//           path="/"
//           element={<Header isLoggedIn={isLoggedIn} setshowlogin={setshowlogin} />}
//         />
//         <Route path="/impact" element={<ReviewPage />} />
//         <Route path="/map" element={<MapComponent />} />
//       </Routes>
//     </>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import { Routes, Route } from "react-router-dom"; // ✅ no BrowserRouter here!
import ReviewPage from "./components/Review/ReviewPage";
import Header from "./components/Header/Header";
import MapComponent from "./components/Map/MapComponent";

const App = () => {
  const [showlogin, setshowlogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setIsLoggedIn(true);
  }, []);

  return (
    <>
      {showlogin && (
        <LoginPopUp setshowlogin={setshowlogin} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Navbar
        setshowlogin={setshowlogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route
          path="/"
          element={<Header isLoggedIn={isLoggedIn} setshowlogin={setshowlogin} />}
        />
        <Route path="/impact" element={<ReviewPage />} />
        <Route path="/map" element={<MapComponent />} />
      </Routes>
    </>
  );
};

export default App;
