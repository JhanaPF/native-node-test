const express = require('express');
const app = express();
const port = 3006;


const url = 'mongodb://mongodb:27017/';
let isConnected = "no";


const mongoose = require('mongoose');


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Db connection error :', err);
});

db.once('open', () => {
  console.log('Db connection success !');
});


app.get('/', (req, res) => {
  res.send(isConnected);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
