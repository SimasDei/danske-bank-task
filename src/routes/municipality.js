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
    Municipality.findOne({
      city: req.query.city
    });
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
  Municipality.findOne({
    city: req.params.city
  })
    .then(document => {
      const { city, yearly, monthly, weekly, daily } = document;
      res.status(200).json({ city, yearly, monthly, weekly, daily });
    })
    .catch(error => {
      res.status(404).json({ message: 'City Not found', error });
    });
});

/**
 * @route - POST
 * add new Municipality with custom tax rates
 */
router.post('/municipalities', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'No Request Data' });
  }
  const municipality = new Municipality(req.body);
  municipality
    .save()
    .then(document => {
      if (!document) {
        return res.status(500).json({ message: 'Server Error' });
      }
      res.status(201).json(document);
    })
    .catch(err => {
      return res.status(500).json({ message: err });
    });
});

/**
 * @route - PUT
 * update an existing Municipality and it's rates
 */
router.put('/municipalities', (req, res) => {
  if (!req.query.city) {
    res.status(400).json({ message: 'Please specify City' });
  }
  Municipality.findOneAndUpdate({ city: req.query.city }, req.body, {
    new: true
  })
    .then(document => res.status(200).json(document))
    .catch(err => res.status(500).json({ message: err }));
});

/**
 * @route - DELETE
 * delete a selected Municipality
 */
router.delete('/municipalities', (req, res) => {
  if (!req.query.city) {
    res.status(400).json({ message: 'Please specify City' });
  }
  Municipality.findOneAndDelete({ city: req.query.city })
    .then(document => res.status(200).json({ message: 'Municipality Deleted' }))
    .catch(err => res.status(500).json({ message: err }));
});

router.get('/error', (req, res) => {
  throw new Error('This is not a game');
});

module.exports = router;
