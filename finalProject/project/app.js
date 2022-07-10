const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const port = process.env.PORT || 8080;
const api_key = process.env.API_KEY;
const app = express();
dotenv.config();

app.listen(8080, () => console.log(`Listening on port ${port}`));

const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/api', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post('/api', (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json(data);
});

app.get('/earth', async(req, res) => {
  const api_url = `https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=${api_key}`
  const response = await fetch(api_url);
  const json = await response.json();
  res.json(json);
})
  
