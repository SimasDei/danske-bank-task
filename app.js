const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config');

/**
 * @method mongoose = Connect to MongoDB Atlas
 */
const connString = `mongodb+srv://${dbConfig.dbName}:${
  dbConfig.dbPass
}@baltic-react-mongodb-one-l0d3u.mongodb.net/${
  dbConfig.dbCollection
}?retryWrites=true`;
const db = mongoose
  .connect(connString, { useNewUrlParser: true })
  .then(console.log('Connected to DB'));

/**
 * @model - Municipality
 * import mongoose model
 */
const Municipality = require('./models/Municipality');

/**
 * @route -  GET
 * default home page
 */
app.get('/', (req, res) => res.send('Ahoy Sailor o/'));

/**
 * @route - GET
 * Get all municipalities and rates
 */
app.get('/municipalities', (req, res) => {
  Municipality.find({}, (error, municipalities) => {
    if (error) {
      console.log(error);
    }
    res.json(municipalities);
  });
});

app.listen(1337);
console.log('Connection established, Captain o/');
