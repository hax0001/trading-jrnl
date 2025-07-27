import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analysis = () => {
  const [trades, setTrades] = useState([]);
  const [range, setRange] = useState({ start: '', end: '' });
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/trades').then(res => setTrades(res.data));
  }, []);

  const filterTrades = () => {
    if (!range.start || !range.end) return;
    const result = trades.filter(trade => {
      const d = new Date(trade.date);
      return d >= new Date(range.start) && d <= new Date(range.end);
    });
    setFiltered(result);
  };

  const total = filtered.length;
  const wins = filtered.filter(t => (t.direction === 'long' && t.exit > t.entry) || (t.direction === 'short' && t.exit < t.entry)).length;
  const winRate = total ? Math.round((wins / total) * 100) : 0;
  const avgRR = total ? (filtered.reduce((sum, t) => sum + parseFloat(t.rr || 0), 0) / total).toFixed(2) : 0;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analysis</h2>
      <div className="flex items-center gap-4 mb-4">
        <input type="date" value={range.start} onChange={e => setRange({ ...range, start: e.target.value })} className="border p-2" />
        <input type="date" value={range.end} onChange={e => setRange({ ...range, end: e.target.value })} className="border p-2" />
        <button onClick={filterTrades} className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
      </div>

      {total > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold">Filtered Trades</h3>
            <p className="text-2xl">{total}</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold">Win Rate</h3>
            <p className="text-2xl">{winRate}%</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h3 className="font-bold">Avg R:R</h3>
            <p className="text-2xl">{avgRR}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No trades in selected range.</p>
      )}
    </div>
  );
};

export default Analysis;