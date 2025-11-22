const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const auth = require('../middleware/auth');

// Create request
router.post('/', async (req, res) => {
  try {
    const r = new Request(req.body);
    const saved = await r.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List requests (protected)
router.get('/', auth, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark fulfilled (protected)
router.put('/:id/fulfill', auth, async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, { fulfilled: true }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
