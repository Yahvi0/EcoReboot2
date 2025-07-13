import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { year: "2020", USA: 4800, China: 9800, India: 2400, Germany: 750, Brazil: 520 },
  { year: "2021", USA: 5100, China: 10200, India: 2600, Germany: 770, Brazil: 530 },
  { year: "2022", USA: 4950, China: 10500, India: 2700, Germany: 760, Brazil: 540 },
  { year: "2023", USA: 5000, China: 10700, India: 2800, Germany: 740, Brazil: 550 },
  { year: "2024", USA: 4920, China: 10850, India: 2900, Germany: 730, Brazil: 560 }, // sample
  { year: "2025", USA: 4880, China: 11000, India: 3000, Germany: 720, Brazil: 570 }  // sample
];

const CO2EmissionsChart2020to2025 = () => (
  <div className="chart-wrapper">
    <h2 className="chart-title">🌍 CO₂ Emissions by Country (2020 – 2025)</h2>
    <p className="chart-subtitle">Million Metric Tons</p>

    <ResponsiveContainer width="100%" height={420}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

export default CO2EmissionsChart2020to2025;
