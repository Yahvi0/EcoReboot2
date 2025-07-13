import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

/* replace with your own forecast figures if available */
const forecast = [
  { year: "2026", USA: 4820, China: 11150, India: 3150, Germany: 710, Brazil: 580 },
  { year: "2027", USA: 4750, China: 11300, India: 3300, Germany: 700, Brazil: 590 },
  { year: "2028", USA: 4690, China: 11450, India: 3450, Germany: 690, Brazil: 600 },
  { year: "2029", USA: 4630, China: 11600, India: 3600, Germany: 680, Brazil: 610 },
  { year: "2030", USA: 4570, China: 11750, India: 3750, Germany: 670, Brazil: 620 }
];

const PredictedCO2Chart2026to2030 = () => (
  <div className="chart-wrapper">
    <h2 className="chart-title">🔮 Predicted CO₂ Emissions (2026 – 2030)</h2>
    <p className="chart-subtitle">Forecast — Million Metric Tons</p>

    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={forecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis label={{ value: "CO₂ (Mt)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="USA"     fill="#8884d8" />
        <Bar dataKey="China"   fill="#82ca9d" />
        <Bar dataKey="India"   fill="#ffc658" />
        <Bar dataKey="Germany" fill="#ff8042" />
        <Bar dataKey="Brazil"  fill="#a4de6c" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default PredictedCO2Chart2026to2030;
