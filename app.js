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
 * @route -  GET
 * default home page
 */
app.get('/', (req, res) => res.send('Ahoy Sailor o/'));

app.listen(1337);
console.log('Connection established, Captain o/');
