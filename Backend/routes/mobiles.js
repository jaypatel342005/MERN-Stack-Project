const express = require('express');
const Mobile = require('../models/Mobile');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all mobiles
router.get('/', async (req, res, next) => {
  try {
    const mobiles = await Mobile.find();
    res.json(mobiles);
  } catch (err) {
    next(err);  // Passes errors to the error handler
  }
});

// Get a mobile by ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(`Received request for ID: ${id}`);

  try {
    const mobile = await Mobile.findById(id);
    
    if (!mobile) {
      console.log('Mobile not found');
      return res.status(404).json({ message: 'Mobile not found' });
    }

    console.log('Mobile found:', mobile);
    res.json(mobile);
  } catch (error) {
    console.error('Error finding mobile:', error);
    res.status(500).json({ message: 'Error fetching mobile', error: error.message });
  }
});

// Create a new mobile
router.post(
  '/',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('brand').not().isEmpty().withMessage('Brand is required'),
    body('model').not().isEmpty().withMessage('Model is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('releaseDate').isDate().withMessage('Invalid date')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const mobile = new Mobile(req.body);
      const newMobile = await mobile.save();
      res.status(201).json(newMobile);
    } catch (err) {
      next(err); // Pass the error to the error handler
    }
  }
);

// Update a mobile
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedMobile = await Mobile.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedMobile) {
      return res.status(404).json({ message: 'Mobile not found' });
    }

    res.json(updatedMobile);
  } catch (err) {
    console.error('Error updating mobile:', err);
    next(err);
  }
});

// Delete a mobile
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const mobile = await Mobile.findById(id);
    
    if (!mobile) {
      return res.status(404).json({ success: false, message: 'Mobile not found' });
    }

    // Use deleteOne() to remove the document
    await Mobile.deleteOne({ _id: id });

    res.json({ success: true, message: 'Mobile deleted successfully' });
  } catch (err) {
    console.error('Error deleting mobile:', err);
    next(err);
  }
});

module.exports = router;
