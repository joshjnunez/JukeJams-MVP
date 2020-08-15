require('dotenv').config();

const { User } = require('./db/database.js');

const express = require('express');
const path = require('path');
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const app = express();
const { PORT } = process.env;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(express.static(DIST_DIR));

app.get('/grabUsers', (req, res) => {
  console.log('send it');
  User.findAll().then((user) => res.send(user));
});

app.post('/addUsers', (req, res) => {
  console.log(req.body.firstName);
  User.create(req.body);
});

// app.get('/api', (req, res) => {
//   res.send('hey it worked');
// });
// app.get('/', (req, res) => {
//   res.sendFile(HTML_FILE);
// });

app.listen(PORT, function () {
  console.log('App listening on port: ' + PORT);
});
