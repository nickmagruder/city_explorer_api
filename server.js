'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;


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


app.get('/weather', function (req, res) {
    res.send({
        "forecast": "Partly cloudy until afternoon.",
        "time": "Mon Jan 01 2001"
    }
    );
});



// ===== callback functions ==========================================================

function LocationConstructor(locationObject) {
    this.search_query = 'Lynnwood';
    this.formatted_query = locationObject.display_name;
    this.latitude = locationObject.lat;
    this.longitude = locationObject.lon;
}





// ===== error handling and server start

app.use('*', (request, response) => {
    response.status(404).send('Route note found');
});

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));