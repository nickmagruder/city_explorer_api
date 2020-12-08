'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const weatherArray = [];


// ===== middleware ================================================================

app.use(cors());


// ===== light routes ===============================================================
// https://code301-city-explorer-api.herokuapp.com/location?city=seattle 


app.get('/location', function (req, res) {
    const locationData = require('./data/location.json');
    const instanceLocationData = new LocationConstructor(locationData[0]);
    res.send(instanceLocationData);
    console.log(instanceLocationData);
});


/* Example Response:

[
    {
      "forecast": "Partly cloudy until afternoon.",
      "time": "Mon Jan 01 2001"
    },
    {
      "forecast": "Mostly cloudy in the morning.",
      "time": "Tue Jan 02 2001"
    },
    ...
  ] */


app.get('/weather', function (req, res) {
    const weatherData = require('./data/weather.json');
    weatherData.data.forEach(entry => {
        weatherArray.push(new WeatherConstructor(entry));
    });
    console.log(weatherArray);
    res.send(weatherArray);
});


// ===== callback functions ==========================================================

function LocationConstructor(locationObject) {
    this.search_query = 'Lynnwood';
    this.formatted_query = locationObject.display_name;
    this.latitude = locationObject.lat;
    this.longitude = locationObject.lon;
}

function WeatherConstructor(weatherObject) {
    this.forecast = weatherObject.weather.description;
    this.time = weatherObject.valid_date;
}


// ===== error handling and server start

app.use('*', (request, response) => {
    response.status(404).send('Route note found');
});

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));