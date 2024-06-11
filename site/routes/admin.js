const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database('./database.sqlite');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin.html'));
});

router.post('/add', (req, res) => {
  const { name, description, price } = req.body;
  db.run(`INSERT INTO products (name, description, price) VALUES (?, ?, ?)`,
    [name, description, price],
    function(err) {
      if (err) {
        res.status(500).send("Error adding product.");
      } else {
        res.redirect('/admin');
      }
    }
  );
});

module.exports = router;