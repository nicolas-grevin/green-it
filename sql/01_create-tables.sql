CREATE TABLE IF NOT EXISTS astronauts (
  id      SERIAL          PRIMARY KEY,
  name    VARCHAR (50)    UNIQUE NOT NULL 
);
