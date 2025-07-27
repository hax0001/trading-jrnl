import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTrade = () => {
  const [date, setDate] = useState('');
  const [direction, setDirection] = useState('long');
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');
  const [rr, setRR] = useState('');
  const [setup, setSetup] = useState('');
  const [contracts, setContracts] = useState(1);
  const [notes, setNotes] = useState('');
  const [rulesFollowed, setRulesFollowed] = useState('');
  const [rules, setRules] = useState([]);
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/rules').then(res => setRules(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('date', date);
    formData.append('direction', direction);
    formData.append('entry', entry);
    formData.append('exit', exit);
    formData.append('rr', rr);
    formData.append('setup', setup);
    formData.append('contracts', contracts);
    formData.append('notes', notes);
    formData.append('rules_followed', rulesFollowed);
    if (screenshot) {
      formData.append('screenshot', screenshot);
    }

    try {
      await axios.post('http://localhost:4000/trades', formData);
      alert('Trade added!');
      setDate('');
      setDirection('long');
      setEntry('');
      setExit('');
      setRR('');
      setSetup('');
      setContracts(1);
      setNotes('');
      setRulesFollowed('');
      setScreenshot(null);
    } catch (error) {
      alert('Failed to add trade');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label>Date:</label><br />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Direction:</label><br />
        <select value={direction} onChange={e => setDirection(e.target.value)}>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
      </div>
      <div>
        <label>Entry:</label><br />
        <input type="number" value={entry} onChange={e => setEntry(e.target.value)} required />
      </div>
      <div>
        <label>Exit:</label><br />
        <input type="number" value={exit} onChange={e => setExit(e.target.value)} required />
      </div>
      <div>
        <label>Risk-Reward (R:R):</label><br />
        <input type="number" step="0.01" value={rr} onChange={e => setRR(e.target.value)} />
      </div>
      <div>
        <label>Setup:</label><br />
        <input type="text" value={setup} onChange={e => setSetup(e.target.value)} />
      </div>
      <div>
        <label>Contracts:</label><br />
        <input type="number" value={contracts} onChange={e => setContracts(e.target.value)} min="1" />
      </div>
      <div>
        <label>Notes:</label><br />
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <div>
        <label>Rules Followed:</label><br />
        <input type="text" value={rulesFollowed} onChange={e => setRulesFollowed(e.target.value)} />
      </div>
      <div>
        <label>Screenshot:</label><br />
        <input type="file" onChange={e => setScreenshot(e.target.files[0])} />
      </div>
      <button type="submit">Add Trade</button>
    </form>
  );
};

export default AddTrade;