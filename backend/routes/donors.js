const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const auth = require('../middleware/auth');

// Create donor
router.post('/', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    const saved = await donor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search by query params ?bloodGroup=A&location=City
router.get('/search', async (req, res) => {
  try {
    const q = {};
    if (req.query.bloodGroup) q.bloodGroup = req.query.bloodGroup;
    if (req.query.location) q.location = { $regex: req.query.location, $options: 'i' };
    if (req.query.name) q.name = { $regex: req.query.name, $options: 'i' };
    const donors = await Donor.find(q).sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update donor (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
