import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState({ total: 0, winRate: 0, avgRR: 0 });

  useEffect(() => {
    axios.get('http://localhost:4000/trades').then(res => {
      const trades = res.data;
      const total = trades.length;
      const wins = trades.filter(t => (t.direction === 'long' && t.exit > t.entry) || (t.direction === 'short' && t.exit < t.entry)).length;
      const winRate = total ? Math.round((wins / total) * 100) : 0;
      const avgRR = total ? (trades.reduce((sum, t) => sum + parseFloat(t.rr || 0), 0) / total).toFixed(2) : 0;
      setSummary({ total, winRate, avgRR });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-bold">Total Trades</h3>
        <p className="text-2xl">{summary.total}</p>
      </div>
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-bold">Win Rate</h3>
        <p className="text-2xl">{summary.winRate}%</p>
      </div>
      <div className="p-4 border rounded shadow">
        <h3 className="text-lg font-bold">Avg R:R</h3>
        <p className="text-2xl">{summary.avgRR}</p>
      </div>
    </div>
  );
};

export default Dashboard;