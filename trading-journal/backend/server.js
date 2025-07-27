const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// SQLite DB setup
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`CREATE TABLE trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    direction TEXT,
    entry REAL,
    exit REAL,
    rr REAL,
    setup TEXT,
    contracts INTEGER,
    notes TEXT,
    rules_followed TEXT,
    screenshot TEXT
  )`);

  db.run(`CREATE TABLE rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT
  )`);
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage });

// Routes
app.post('/trades', upload.single('screenshot'), (req, res) => {
  const { date, direction, entry, exit, rr, setup, contracts, notes, rules_followed } = req.body;
  const screenshot = req.file ? req.file.filename : null;

  db.run(`INSERT INTO trades (date, direction, entry, exit, rr, setup, contracts, notes, rules_followed, screenshot)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [date, direction, entry, exit, rr, setup, contracts, notes, rules_followed, screenshot],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.get('/trades', (req, res) => {
  const { start, end } = req.query;
  let query = 'SELECT * FROM trades';
  const params = [];

  if (start && end) {
    query += ' WHERE date BETWEEN ? AND ?';
    params.push(start, end);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/rules', (req, res) => {
  db.all('SELECT * FROM rules', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/rules', (req, res) => {
  const { text } = req.body;
  db.run('INSERT INTO rules (text) VALUES (?)', [text], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, text });
  });
});

app.delete('/rules/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM rules WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});