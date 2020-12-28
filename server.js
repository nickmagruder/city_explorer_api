'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const { query } = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const DATABASE_URL = process.env.DATABASE_URL;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const YELP_API_KEY = process.env.MOVIE_API_KEY;

const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.error(error));


// ===== middleware ================================================================

app.use(cors());


// ===== light routes ===============================================================

app.get('/location', getLoc);
app.get('/yelp', yelpAPI);

// https://code301-city-explorer-api.herokuapp.com/location?city=seattle 


// location NEW
function getLoc(req, res) {
    const query = req.query.city
    client.query('SELECT * FROM location WHERE search_query=$1', [query])
        .then(result => {
            if (result.rows.length !== 0) {
                console.log(result.rows);
                res.send(result.rows[0]);
            } else {
                superagent.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${query}&format=json`)
                    .then(result => {
                        const location = new LocationConstructor(result.body[0], query);
                        const sql = 'INSERT INTO location (search_query, latitude, longitude, formatted_query) VALUES ($1, $2, $3, $4)';
                        client.query(sql, [location.search_query, location.latitude, location.longitude, location.formatted_query])
                            .then(() => {
                                res.send(location);
                            });
                    });
            }
        });
}


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
            res.status(500).send('Sorry, an error has occured');
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
            res.status(500).send('Sorry, an error has occured');
            console.log(error, 'ERROR!')
        });
});

app.get('/movies', function (req, res) {
    const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
    const urlMovies = 'https://api.themoviedb.org/3/search/movie';

    return superagent.get(urlMovies)
        .query({
            api_key: MOVIE_API_KEY,
            language: 'en-us',
            page: '1',
            query: req.query.search_query,
        })
        .then(movieEntry => {
            let movieArray = movieEntry.body.results;
            let nextMovieData = movieArray.map(film => {
                return new MovieConstructor(film);
            })
            res.send(nextMovieData);
        })
        .catch(error => {
            res.status(500).send('Sorry, an error has occured');
            console.log(error, 'ERROR!')
        });
});

function yelpAPI(req, res) {
    const yelpLat = req.query.latitude;
    const yelpLong = req.query.longitude; 
    const YELP_API_KEY = process.env.YELP_API_KEY;
    const urlYelp = 'https://api.yelp.com/v3/businesses/search';

    return superagent.get(urlYelp)
        .set('Authorization', `Bearer ${YELP_API_KEY}`)
        .query({
            term: 'restaurants',
            latitude: yelpLat,
            longitude: yelpLong,
            limit: '20',
    })
        .then(yelpEntry => {
            let yelpArray = yelpEntry.body.businesses;
            let nextYelpData = yelpArray.map(food => {
                return new Yelp(food);
            })
            res.send(nextYelpData);
        })
        .catch(error => {
            res.status(500).send('Sorry, an error has occured');
            console.log(error, 'ERROR!')
        });
};

// ===== callback functions ==========================================================

function Yelp(food){
    this.name = food.name 
    this.image_url = food.image_url
    this.price = food.price
    this.rating = food.rating
    this.url = food.url
  }

function LocationConstructor(locationObject, reqCity) {
    this.search_query = reqCity;
    this.formatted_query = locationObject.display_name;
    this.latitude = locationObject.lat;
    this.longitude = locationObject.lon;
}

function WeatherConstructor(weatherObject, searchQuery) {
    this.search_query = searchQuery;
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

function MovieConstructor(movieObject) {
    this.title = movieObject.original_title;
    this.overview = movieObject.overview;
    this.average_votes = movieObject.vote_average;
    this.image_url = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
    this.popularity = movieObject.popularity;
    this.released_on = movieObject.release_date;
}


// ===== error handling and server start


app.use('*', (req, res) => {
    res.send('Sorry, unable to find route.');
});

const listen = () => app.listen(PORT, () => console.log(`Running successfully on port : ${PORT}`));

client.connect()
    .then(listen);
