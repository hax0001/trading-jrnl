import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rules = () => {
  const [rules, setRules] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/rules').then(res => setRules(res.data));
  }, []);

  const addRule = async () => {
    if (!text.trim()) return;
    const res = await axios.post('http://localhost:4000/rules', { text });
    setRules([...rules, res.data]);
    setText('');
  };

  const deleteRule = async (id) => {
    await axios.delete(`http://localhost:4000/rules/${id}`);
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Trading Rules</h2>

      <div className="mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter new rule"
          className="border p-2 w-full"
        />
        <button onClick={addRule} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">Add Rule</button>
      </div>

      <ul className="space-y-2">
        {rules.map(rule => (
          <li key={rule.id} className="flex justify-between items-center border p-2 rounded">
            <span>{rule.text}</span>
            <button onClick={() => deleteRule(rule.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rules;