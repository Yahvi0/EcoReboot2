import React, { useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

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

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    
    <div style={{ padding: '80px', textAlign: 'center' }}>
      <h2>Eco-Friendly Route Optimizer 🌍</h2>

      <input
        type="text"
        placeholder="Start Location"
        value={start}
        onChange={(e) => {
          setStart(e.target.value);
          debounceSuggestions(e.target.value);
        }}
        style={{ margin: '10px', padding: '10px', width: '250px' }}
      />
      <input
        type="text"
        placeholder="End Location"
        value={end}
        onChange={(e) => {
          setEnd(e.target.value);
          debounceSuggestions(e.target.value);
        }}
        style={{ margin: '10px', padding: '10px', width: '250px' }}
      />
      <input
        type="text"
        placeholder="Stops (comma separated)"
        value={stops}
        onChange={(e) => setStops(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '300px' }}
      />

      {suggestions.length > 0 && (
        <div style={{ backgroundColor: '#f9f9f9', margin: '10px auto', width: '90%', border: '1px solid #ccc', borderRadius: '6px' }}>
          {suggestions.map((s, i) => (
            <div
              key={i}
              style={{ padding: '8px', borderBottom: '1px solid #eee', cursor: 'pointer' }}
              onClick={() => handleSuggestionClick(s.display_name, start ? 'end' : 'start')}
            >
              {s.display_name}
            </div>
          ))}
        </div>
      )}

      <br />
      <button
        onClick={handleRoute}
        style={{
          padding: '12px 25px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '15px',
          
        }}
      >
        Show Route
      </button>

      {distance && duration && (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          <p><strong>🛣️ Distance:</strong> {distance} km</p>
          <p><strong>⏱️ Estimated Time:</strong> {duration} minutes</p>
        </div>
      )}

      <div id="map" style={{ height: '500px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
};

export default MapComponent;
