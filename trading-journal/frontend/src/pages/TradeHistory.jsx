import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TradeHistory = () => {
  const [trades, setTrades] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/trades').then(res => setTrades(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Trade History</h2>
      <table className="table-auto w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Direction</th>
            <th className="p-2 border">Entry</th>
            <th className="p-2 border">Exit</th>
            <th className="p-2 border">RR</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => setSelected(trade)}>
              <td className="p-2 border">{trade.date}</td>
              <td className="p-2 border">{trade.direction}</td>
              <td className="p-2 border">{trade.entry}</td>
              <td className="p-2 border">{trade.exit}</td>
              <td className="p-2 border">{trade.rr}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="border p-4 shadow">
          <h3 className="text-lg font-bold mb-2">Trade Details</h3>
          <p><strong>Setup:</strong> {selected.setup}</p>
          <p><strong>Contracts:</strong> {selected.contracts}</p>
          <p><strong>Notes:</strong> {selected.notes}</p>
          <p><strong>Rules Followed:</strong> {selected.rules_followed}</p>
          {selected.screenshot && (
            <div className="mt-4">
              <p className="font-bold">Screenshot:</p>
              <a href={`http://localhost:4000/uploads/${selected.screenshot}`} target="_blank" rel="noopener noreferrer">
                <img src={`http://localhost:4000/uploads/${selected.screenshot}`} alt="Screenshot" className="w-64 border" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TradeHistory;