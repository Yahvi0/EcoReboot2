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
      }

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Plan Your Route 🧭</h2>

      <input
        type="text"
        placeholder="Start Location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '250px' }}
      />
      <input
        type="text"
        placeholder="End Location"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '250px' }}
      />
      <input
        type="text"
        placeholder="Stops (optional, comma separated)"
        value={stops}
        onChange={(e) => setStops(e.target.value)}
        style={{ margin: '10px', padding: '10px', width: '300px' }}
      />

      <br />
      <button
        onClick={handleRoute}
        style={{
          padding: '12px 25px',
          backgroundColor: '#222',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '15px',
        }}
      >
        Show Route
      </button>

      <div id="map" style={{ height: '500px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
};

export default MapComponent;
