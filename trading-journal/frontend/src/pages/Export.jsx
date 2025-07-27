import React, { useState } from 'react';
import axios from 'axios';

const Export = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [exportData, setExportData] = useState(null);

  const handleExport = async () => {
    if (!start || !end) return;
    const res = await axios.get(`http://localhost:4000/trades?start=${start}&end=${end}`);
    setExportData(res.data);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades_${start}_to_${end}.json`;
    a.click();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Export Trades</h2>

      <div className="flex space-x-4 mb-4">
        <input type="date" value={start} onChange={e => setStart(e.target.value)} className="border p-2" />
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="border p-2" />
        <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded">Fetch</button>
      </div>

      {exportData && (
        <div>
          <p>{exportData.length} trades found</p>
          <button onClick={downloadJSON} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Download JSON</button>
        </div>
      )}
    </div>
  );
};

export default Export;