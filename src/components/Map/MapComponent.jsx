// import React, { useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine';

// const MapComponent = () => {
//   const mapRef = useRef(null);
//   const routingControlRef = useRef(null);

//   const [start, setStart] = useState('');
//   const [end, setEnd] = useState('');
//   const [stops, setStops] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);
//   const [typingTimer, setTypingTimer] = useState(null);

//   const fetchSuggestions = async (query) => {
//     if (!query) return;
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
//       const data = await res.json();
//       setSuggestions(data);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     }
//   };

//   const debounceSuggestions = (text) => {
//     if (typingTimer) clearTimeout(typingTimer);
//     setTypingTimer(setTimeout(() => fetchSuggestions(text), 300));
//   };

//   const handleSuggestionClick = (place, type) => {
//     if (type === 'start') setStart(place);
//     else if (type === 'end') setEnd(place);
//     setSuggestions([]);
//   };

//   const handleGeocode = async (place) => {
//     const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
//     const data = await res.json();
//     if (data && data.length > 0) {
//       return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
//     } else {
//       throw new Error(`Location not found: ${place}`);
//     }
//   };

//   const handleRoute = async () => {
//     try {
//       const startCoords = await handleGeocode(start);
//       const endCoords = await handleGeocode(end);
//       const stopNames = stops ? stops.split(',').map((s) => s.trim()) : [];
//       const stopCoords = await Promise.all(stopNames.map((loc) => handleGeocode(loc)));

//       const waypoints = [
//         L.latLng(startCoords[0], startCoords[1]),
//         ...stopCoords.map(([lat, lon]) => L.latLng(lat, lon)),
//         L.latLng(endCoords[0], endCoords[1]),
//       ];

//       if (!mapRef.current) {
//         mapRef.current = L.map('map').setView(startCoords, 6);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; OpenStreetMap contributors',
//         }).addTo(mapRef.current);
//       }

//       if (routingControlRef.current) {
//         routingControlRef.current.setWaypoints(waypoints);
//       } else {
//         routingControlRef.current = L.Routing.control({
//           waypoints,
//           routeWhileDragging: true,
//           show: true,
//         }).addTo(mapRef.current);

//         routingControlRef.current.on('routesfound', function (e) {
//           const route = e.routes[0];
//           setDistance((route.summary.totalDistance / 1000).toFixed(2));
//           setDuration((route.summary.totalTime / 60).toFixed(1));
//         });
//       }

//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   return (
    
//     <div style={{ padding: '80px', textAlign: 'center' }}>
//       <h2>Eco-Friendly Route Optimizer 🌍</h2>

//       <input
//         type="text"
//         placeholder="Start Location"
//         value={start}
//         onChange={(e) => {
//           setStart(e.target.value);
//           debounceSuggestions(e.target.value);
//         }}
//         style={{ margin: '10px', padding: '10px', width: '250px' }}
//       />
//       <input
//         type="text"
//         placeholder="End Location"
//         value={end}
//         onChange={(e) => {
//           setEnd(e.target.value);
//           debounceSuggestions(e.target.value);
//         }}
//         style={{ margin: '10px', padding: '10px', width: '250px' }}
//       />
//       <input
//         type="text"
//         placeholder="Stops (comma separated)"
//         value={stops}
//         onChange={(e) => setStops(e.target.value)}
//         style={{ margin: '10px', padding: '10px', width: '300px' }}
//       />

//       {suggestions.length > 0 && (
//         <div style={{ backgroundColor: '#f9f9f9', margin: '10px auto', width: '90%', border: '1px solid #ccc', borderRadius: '6px' }}>
//           {suggestions.map((s, i) => (
//             <div
//               key={i}
//               style={{ padding: '8px', borderBottom: '1px solid #eee', cursor: 'pointer' }}
//               onClick={() => handleSuggestionClick(s.display_name, start ? 'end' : 'start')}
//             >
//               {s.display_name}
//             </div>
//           ))}
//         </div>
//       )}

//       <br />
//       <button
//         onClick={handleRoute}
//         style={{
//           padding: '12px 25px',
//           backgroundColor: '#28a745',
//           color: 'white',
//           border: 'none',
//           borderRadius: '8px',
//           cursor: 'pointer',
//           marginTop: '15px',
          
//         }}
//       >
//         Show Route
//       </button>

//       {distance && duration && (
//         <div style={{ marginTop: '20px', fontSize: '18px' }}>
//           <p><strong>🛣️ Distance:</strong> {distance} km</p>
//           <p><strong>⏱️ Estimated Time:</strong> {duration} minutes</p>
//         </div>
//       )}

//       <div id="map" style={{ height: '500px', width: '100%', marginTop: '20px' }}></div>
//     </div>
//   );
// };

// export default MapComponent;

import React, { useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { motion } from 'framer-motion';

const MapComponent = () => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [stops, setStops] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [typingTimer, setTypingTimer] = useState(null);
  const [carbonEmission, setCarbonEmission] = useState(0);
  const [travelTips, setTravelTips] = useState([]);
  const [showCarbon, setShowCarbon] = useState(false);
  const [history, setHistory] = useState([]);

  const userId = localStorage.getItem("userId");

  const inputStyle = {
    padding: '12px',
    width: '220px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  const suggestionsContainer = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '500px',
    margin: '0 auto 20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  const suggestionItem = {
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    textAlign: 'left'
  };

  const fetchSuggestions = async (query) => {
    if (!query) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debounceSuggestions = (text) => {
    if (typingTimer) clearTimeout(typingTimer);
    setTypingTimer(setTimeout(() => fetchSuggestions(text), 300));
  };

  const handleSuggestionClick = (place, type) => {
    if (type === 'start') setStart(place);
    else if (type === 'end') setEnd(place);
    setSuggestions([]);
  };

  const handleGeocode = async (place) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
    const data = await res.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      throw new Error(`Location not found: ${place}`);
    }
  };

  const handleRoute = async () => {
    try {
      const startCoords = await handleGeocode(start);
      const endCoords = await handleGeocode(end);
      const stopNames = stops ? stops.split(',').map((s) => s.trim()) : [];
      const stopCoords = await Promise.all(stopNames.map((loc) => handleGeocode(loc)));

      const waypoints = [
        L.latLng(startCoords[0], startCoords[1]),
        ...stopCoords.map(([lat, lon]) => L.latLng(lat, lon)),
        L.latLng(endCoords[0], endCoords[1]),
      ];

      if (!mapRef.current) {
        mapRef.current = L.map('map').setView(startCoords, 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapRef.current);
      }

      if (routingControlRef.current) {
        routingControlRef.current.setWaypoints(waypoints);
      } else {
        routingControlRef.current = L.Routing.control({
          waypoints,
          routeWhileDragging: true,
          show: true,
        }).addTo(mapRef.current);

        routingControlRef.current.on('routesfound', function (e) {
          const route = e.routes[0];
          setDistance((route.summary.totalDistance / 1000).toFixed(2));
          setDuration((route.summary.totalTime / 60).toFixed(1));
        });
      }

      // Save route history
      if (userId) {
        await fetch("http://localhost:4000/api/auth/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            start,
            end,
            stops: stopNames,
            date: new Date(),
          }),
        });
      }

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleCarbonClick = () => {
    if (!distance) return alert("Please generate a route first!");

    const emissionRate = 0.21;
    const emission = distance * emissionRate;
    setCarbonEmission(emission.toFixed(2));

    const tips = [
      "🚲 Use a bicycle whenever possible!",
      "🚌 Hop on public transport!",
      "🚗 Share rides with friends (carpool ftw)!",
      "⚡ Switch to electric vehicles for long trips.",
      "🌿 Offset CO₂ by planting trees!",
      "🚶‍♀️ Take a walk for nearby places!"
    ];

    const randomTips = tips.sort(() => 0.5 - Math.random()).slice(0, 3);
    setTravelTips(randomTips);
    setShowCarbon(true);
  };

  const fetchSearchHistory = async () => {
    if (!userId) return alert("Login required to view history");
    const res = await fetch(`http://localhost:4000/api/auth/history/${userId}`);
    const data = await res.json();
    setHistory(data || []);
  };

  return (
    <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f9fb' }}>
      <h2 style={{ margin: '30px 0 20px', paddingTop: '20px' }}>
  🌍 <strong>Eco-Friendly Route Optimizer</strong>
</h2>


      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input type="text" placeholder="Start Location" value={start} onChange={(e) => { setStart(e.target.value); debounceSuggestions(e.target.value); }} style={inputStyle} />
        <input type="text" placeholder="End Location" value={end} onChange={(e) => { setEnd(e.target.value); debounceSuggestions(e.target.value); }} style={inputStyle} />
        <input type="text" placeholder="Stops (comma separated)" value={stops} onChange={(e) => setStops(e.target.value)} style={inputStyle} />
      </div>

      {suggestions.length > 0 && (
        <div style={suggestionsContainer}>
          {suggestions.map((s, i) => (
            <div key={i} style={suggestionItem} onClick={() => handleSuggestionClick(s.display_name, start ? 'end' : 'start')}>
              {s.display_name}
            </div>
          ))}
        </div>
      )}

      <div style={{ margin: '20px 0' }}>
        <button style={buttonStyle} onClick={handleRoute}>🗺️ Show Route</button>
        <button style={buttonStyle} onClick={handleCarbonClick}>🌱 Show Carbon Emission & Tips</button>
        <button style={buttonStyle} onClick={fetchSearchHistory}>📜 View My Search History</button>
      </div>

      {distance && duration && (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          <p><strong>🛣️ Distance:</strong> {distance} km</p>
          <p><strong>⏱️ Estimated Time:</strong> {duration} minutes</p>
        </div>
      )}

      {showCarbon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '25px',
            padding: '20px',
            backgroundColor: '#f0fff4',
            border: '2px solid #b6e0c1',
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '20px auto',
            boxShadow: '0 4px 12px rgba(0, 128, 0, 0.1)',
          }}
        >
          <h3 style={{ color: '#2e7d32' }}>🌍 Estimated Carbon Emission</h3>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{carbonEmission} kg CO₂</p>
          <h4>💡 Eco Tips:</h4>
          <ul style={{ textAlign: 'left', fontSize: '16px' }}>
            {travelTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {history.length > 0 && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '20px auto',
          textAlign: 'left'
        }}>
          <h3>🕘 My Search History:</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {history.map((item, index) => (
              <li key={index} style={{
                padding: '10px',
                borderBottom: '1px solid #ddd'
              }}>
                <p><strong>From:</strong> {item.start} <strong>To:</strong> {item.end}</p>
                <p><strong>Stops:</strong> {item.stops.join(', ') || 'None'}</p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div id="map" style={{ height: '500px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
};

export default MapComponent;
