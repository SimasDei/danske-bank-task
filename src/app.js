const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config');
const municipalitiesRoute = require('./routes/municipality');

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
 * @routes
 */
app.use(municipalitiesRoute);

/**
 * @method use,listen - Setup server Configuration
 */
app.use(express.static('public'));
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
