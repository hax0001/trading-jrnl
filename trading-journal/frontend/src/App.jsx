import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTrade from './pages/AddTrade';
import TradeHistory from './pages/TradeHistory';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Rules from './pages/Rules';
import Export from './pages/Export';

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/">Dashboard</Link>
          <Link to="/add">Add Trade</Link>
          <Link to="/history">Trade History</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/rules">Rules</Link>
          <Link to="/export">Export</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTrade />} />
          <Route path="/history" element={<TradeHistory />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;