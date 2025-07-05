import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const predictedData = [
  { year: '2023', USA: 5000, China: 10700, India: 2800, Germany: 740, Brazil: 550 },
  { year: '2024', USA: 4900, China: 10500, India: 2700, Germany: 700, Brazil: 540 },
  { year: '2025', USA: 4700, China: 10100, India: 2550, Germany: 660, Brazil: 530 },
  { year: '2026', USA: 4500, China: 9700, India: 2400, Germany: 630, Brazil: 510 },
  { year: '2027', USA: 4200, China: 9200, India: 2250, Germany: 600, Brazil: 500 },
  { year: '2028', USA: 3900, China: 8600, India: 2100, Germany: 570, Brazil: 490 },
  { year: '2029', USA: 3600, China: 8000, India: 1950, Germany: 540, Brazil: 480 },
  { year: '2030', USA: 3300, China: 7400, India: 1800, Germany: 500, Brazil: 470 },
];

const PredictedCO2BarChart = () => (
  <div className="chart-wrapper">
    <h2 className="chart-title">🌿 Predicted CO₂ Emissions (If Sustainability Goals Are Met)</h2>
    <p className="chart-subtitle">Projected Emissions for 2023–2030 (in Million Metric Tons)</p>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={predictedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis label={{ value: 'CO₂ (Mt)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="USA" fill="#4e79a7" />
        <Bar dataKey="China" fill="#f28e2b" />
        <Bar dataKey="India" fill="#e15759" />
        <Bar dataKey="Germany" fill="#76b7b2" />
        <Bar dataKey="Brazil" fill="#59a14f" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default PredictedCO2BarChart;
