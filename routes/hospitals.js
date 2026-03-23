const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// Get all hospitals
router.get('/', async (req, res) => {
  try {
    const { location, search } = req.query;
    let query = supabase.from('hospitals').select('*');

    if (location) {
      query = query.ilike('location', location);
    }
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single hospital
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Hospital not found' });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;