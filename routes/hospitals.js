const express = require('express');
const router = express.Router();

// Mock hospital data for demo
const hospitals = [
  { id: 1, name: 'Lagos University Teaching Hospital', location: 'Lagos', specialties: ['General', 'Surgery', 'Cardiology'] },
  { id: 2, name: 'University College Hospital', location: 'Ibadan', specialties: ['General', 'Neurology', 'Oncology'] },
  { id: 3, name: 'National Hospital Abuja', location: 'Abuja', specialties: ['General', 'Orthopedics', 'Pediatrics'] },
  { id: 4, name: 'Lagos Island General Hospital', location: 'Lagos', specialties: ['General', 'Emergency'] },
  { id: 5, name: 'Aminu Kano Teaching Hospital', location: 'Kano', specialties: ['General', 'Surgery'] },
];

// Get all hospitals
router.get('/', (req, res) => {
  const { location, search } = req.query;
  let results = hospitals;

  if (location) {
    results = results.filter(h => h.location.toLowerCase() === location.toLowerCase());
  }
  if (search) {
    results = results.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
  }

  res.json({ success: true, data: results });
});

// Get single hospital
router.get('/:id', (req, res) => {
  const hospital = hospitals.find(h => h.id === parseInt(req.params.id));
  if (!hospital) return res.status(404).json({ success: false, message: 'Hospital not found' });
  res.json({ success: true, data: hospital });
});

module.exports = router;