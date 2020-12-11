DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS weather_data;

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255), -- formatted_query TEXT,  -- showing anothertype here, VARCHAR is better
    latitude NUMERIC(9, 6),   /*  7 max digits, 4 decimal digits, decimcal and numeric are identical to SQL */
    longitude NUMERIC(9, 6)   
);

/* keep the properties the same as constructor */

CREATE TABLE weather_data (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  forecast VARCHAR(255),
  time VARCHAR(255)
);