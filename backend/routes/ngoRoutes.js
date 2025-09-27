const express = require('express');
const router = express.Router();

// Sample NGO data that matches the frontend
const ngos = [
  {
    id: 1,
    name: 'Green Earth Foundation',
    description: 'Working to promote sustainable recycling practices and environmental conservation across communities.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    website: 'https://example.org/green-earth'
  },
  {
    id: 2,
    name: 'Recycle Together',
    description: 'Connecting recyclers with local communities to maximize the impact of recycling efforts.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    website: 'https://example.org/recycle-together'
  },
  {
    id: 3,
    name: 'Clean Future Initiative',
    description: 'Dedicated to creating a cleaner future through innovative recycling programs and education.',
    image: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    website: 'https://example.org/clean-future'
  }
];

// @route   GET api/ngos
// @desc    Get all NGOs
// @access  Public
router.get('/', (req, res) => {
  res.json(ngos);
});

// @route   GET api/ngos/:id
// @desc    Get NGO by ID
// @access  Public
router.get('/:id', (req, res) => {
  const ngo = ngos.find(n => n.id === parseInt(req.params.id));
  if (!ngo) return res.status(404).json({ message: 'NGO not found' });
  res.json(ngo);
});

module.exports = router;