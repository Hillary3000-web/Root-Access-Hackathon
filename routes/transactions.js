const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// Save transaction
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { hospitalId, patientName, patientId, amount, transactionRef, description } = req.body;

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        user_id: req.user.id,
        hospital_id: hospitalId,
        patient_name: patientName,
        patient_id: patientId || null,
        amount,
        transaction_ref: transactionRef,
        description,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, message: 'Transaction saved', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user transactions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, hospitals(name, location)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update transaction status (callback)
router.patch('/:ref/status', async (req, res) => {
  try {
    const { status, simulatorSecret } = req.body;

    // Mock webhook signature verification to prevent unauthorized updates
    if (simulatorSecret !== 'mock-interswitch-secret-123') {
      return res.status(401).json({ success: false, message: 'Invalid webhook signature' });
    }

    const { data, error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('transaction_ref', req.params.ref)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;