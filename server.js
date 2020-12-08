'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;



// ===== middleware ================================================================

app.use(cors());


// ===== light routes ===============================================================
// https://code301-city-explorer-api.herokuapp.com/location?city=seattle 


app.get('/location', function (req, res) {
    const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;

    superagent.get(url).then(superAgentReturn => {
        const locationData = superAgentReturn.body[0];
        const instanceLocationData = new LocationConstructor(locationData, req.query.city);
        
        res.send(instanceLocationData);
    });
});


app.get('/weather', function (req, res) {

    const weatherArray = [];
    const weatherData = require('./data/weather.json');
    weatherData.data.forEach(entry => {
        weatherArray.push(new WeatherConstructor(entry));
    });
    console.log(weatherArray);
    res.send(weatherArray);
});


// ===== callback functions ==========================================================

function LocationConstructor(locationObject, reqCity) {
    this.search_query = reqCity;
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