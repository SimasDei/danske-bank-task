const express = require('express');
const router = express.Router();
/**
 * @model - Municipality
 */
const Municipality = require('../models/Municipality');

/**
 * @route - GET
 * Get all municipalities and rates
 */
router.get('/municipalities', (req, res) => {
  Municipality.find({}, (error, municipalities) => {
    if (error) {
      console.log(error);
    }
    res.json(municipalities);
  });
});

module.exports = router;
