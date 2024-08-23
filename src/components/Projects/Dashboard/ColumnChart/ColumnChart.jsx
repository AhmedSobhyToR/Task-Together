// src/components/ColumnChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ColumnChart.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ColumnChart = ({ data, maxDayWeight }) => {
  if (data.length === 0) {
    return (
      <div className="no-data">
        <p>No data available</p>
      </div>
    );
  }

  const formattedData = data.map(item => ({
    ...item,
    date: formatDate(item.date),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, maxDayWeight]} />
        <Tooltip />
        <Bar dataKey="totalWeight" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnChart;
