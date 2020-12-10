DROP TABLE location;

CREATE TABLE location (
    is SERIAL PRIMARY KEY,
search_query VARCHAR(255),
latitude NUMERIC(7, 4);   /*  7 max digits, 4 decimal digits */
longitude NUMERIC(7, 4);   
)

/* keep the properties the same as constructor */