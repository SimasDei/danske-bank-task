const express = require('express');
const router = express.Router();
/**
 * @model - Municipality
 */
const Municipality = require('../models/Municipality');

/**
 * @route - GET
 * Get all municipalities and rates
 * @query city - handle potential queries
 */
router.get('/municipalities', (req, res) => {
  if (req.query.city) {
    res.send(`City requested: ${req.query.city}`);
  }

  Municipality.find({}, (error, municipalities) => {
    if (error) {
      console.log(error);
    }
    res.json(municipalities);
  });
});

/**
 * @route - GET
 * @param city - Requested City
 * Get specific municipality
 */
router.get('/municipalities/:city', (req, res) => {
  res.send(`City requested: ${req.params.city}`);
});

router.get('/error', (req, res) => {
  throw new Error('This is not a game');
});

module.exports = router;
