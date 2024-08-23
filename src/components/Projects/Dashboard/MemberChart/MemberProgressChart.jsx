import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './MemberProgressChart.css';

const MemberProgressChart = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="no-data">
        <p>No data available</p>
      </div>
    );
  }

  const formattedData = data.map(item => ({
    nickname: item.member.nickname,
    progress: item.progress,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart layout="vertical" data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="nickname" />
        <Tooltip />
        <Bar dataKey="progress" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MemberProgressChart;
