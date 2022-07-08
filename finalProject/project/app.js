const express = require('express');
const bodyParser = require('body-parser');
const Amadeus = require('amadeus');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

  const amadeus = new Amadeus();
  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2022-06-01',
    adults: '2'
}).then(function(response){
  console.log(response.data);
}).catch(function(responseError){
  console.log(responseError.code);
});