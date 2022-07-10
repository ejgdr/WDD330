const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// import fetch  from 'node-fetch';

const port = process.env.PORT || 8080;
const api_key = process.env.API_KEY;
const app = express();
dotenv.config();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(express.static('public'));

  app.listen(8080, () => console.log(`Listening on port ${port}`))


  // const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);

  // console.log(response.ok);
  // console.log(response.status);
  // console.log(response.statusText);
  // console.log(response.headers.raw());
  // console.log(response.headers.get('content-type'));
  
