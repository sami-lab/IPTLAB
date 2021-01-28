const express = require('express');
const cors = require('cors');
const test = require('./routes/testRoutes');

const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use('/api/test', test);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
