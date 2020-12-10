'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.error(error));


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
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const urlWeather = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${long}&days=5`;

    return superagent.get(urlWeather)
        .then(entry => {
            let weatherArray = entry.body.data
            let nextWeatherData = weatherArray.map(weather => {
                return new WeatherConstructor(weather);
            })
            res.send(nextWeatherData);
        })
        .catch(error => {
            console.log(error, 'ERROR!')
        });
});

app.get('/trails', function (req, res) {
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const TRAIL_API_KEY = process.env.TRAIL_API_KEY;
    const urlTrails = `http://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=100&key=${TRAIL_API_KEY}&maxResults=5`;

    return superagent.get(urlTrails)
        .then(trailEntry => {
            let trailsArray = trailEntry.body.trails;
            let nextTrailData = trailsArray.map(trail => {
                return new TrailConstructor(trail);
            })
            res.send(nextTrailData);
        })
        .catch(error => {
            console.log(error, 'ERROR!')
        });
});

//     at processTicksAndRejections (internal/process/task_queues.js:97:5) ERROR!

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

function TrailConstructor(trailObject) {
    this.name = trailObject.name;
    this.location = trailObject.location;
    this.length = trailObject.length;
    this.stars = trailObject.stars;
    this.star_votes = trailObject.starVotes;
    this.summary = trailObject.summary;
    this.trail_url = trailObject.url;
    this.conditions = trailObject.conditionDetails;
    this.condition_date = trailObject.conditionDate.slice(0, 10);
    this.condition_time = trailObject.conditionDate.slice(11);
}


// ===== error handling and server start

app.use('*', (request, response) => {
    response.status(404).send('Route note found');
});


client.connect()
.then(() => {
app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
})
.catch(error => console.error(error));