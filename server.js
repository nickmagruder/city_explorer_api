'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;


// ===== middleware ================================================================

app.use(cors());


// ===== light routes ===============================================================

app.get('/gps', function (req, res) {
    const gpsData = require('./data/location.json');
    const instanceOfGpsData = new GpsData(gpsData);
    res.send(instanceOfGpsData);

    console.log(instanceOfGpsData);

    res.send(instanceOfGpsData);
});

