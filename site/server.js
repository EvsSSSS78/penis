const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Подключение базы данных
const db = new sqlite3.Database('./database.sqlite');

// Инициализация базы данных
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL
  )`);
});

// Роуты
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
