const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config');
const municipalitiesRoute = require('./routes/municipality');

// Use body-parser to parse requests into JSON
app.use(bodyParser.json());

/**
 * @module mongoose = Connect to MongoDB Atlas
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
 * @errors - handle 404 and 500
 */
// Handle 404
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  next();
});
// Handle 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});

/**
 * @middleware static - Native Express Middleware
 * @method use,listen - Setup server Configuration
 */
app.use(express.static('public'));
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
