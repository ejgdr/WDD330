const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Datastore = require('nedb');
const fetch = require('node-fetch');

dotenv.config();
const port = process.env.PORT || 8080;
const api_key = process.env.API_KEY;
const app = express();


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

app.get('/earth/:latlon', async(req, res) => {
  const latlon = req.params.latlon.split(',');
  const latitude = latlon[0];
  const longitude = latlon[1];
  const api_url = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=2018-01-01&&dim=0.10&api_key=${api_key}`
  const response = await fetch(api_url);
  const json = await response.json();
  res.json(json);
})
  
