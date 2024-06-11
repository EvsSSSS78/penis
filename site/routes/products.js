const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, row) => {
    if (err) {
      res.status(500).send("Error retrieving product.");
    } else {
      res.json(row);
    }
  });
});

module.exports = router;