const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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

// Generate a short unique link ID
function generateLinkId() {
  return crypto.randomBytes(6).toString('hex'); // 12 chars
}

// Create payment link (public, no auth needed)
router.post('/create', async (req, res) => {
  try {
    const { hospitalId, hospitalName, hospitalLocation, patientName, patientId, treatment, amount, note, origin } = req.body;

    if (!hospitalId || !patientName || !amount || !treatment) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const linkId = generateLinkId();

    const { data, error } = await supabase
      .from('payment_links')
      .insert([{
        link_id: linkId,
        hospital_id: hospitalId,
        hospital_name: hospitalName,
        hospital_location: hospitalLocation,
        patient_name: patientName,
        patient_id: patientId || null,
        treatment,
        amount,
        note: note || null,
        status: 'active',
      }])
      .select()
      .single();

    if (error) throw error;

    const baseUrl = origin || process.env.FRONTEND_URL || 'https://mediremit.vercel.app';
    const paymentUrl = `${baseUrl}/pay/${linkId}`;

    res.json({
      success: true,
      message: 'Payment link created',
      linkId,
      paymentUrl,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment link details (public — no auth)
router.get('/:linkId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payment_links')
      .select('*')
      .eq('link_id', req.params.linkId)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Payment link not found' });
    }

    if (data.status !== 'active') {
      return res.status(410).json({ success: false, message: 'This payment link has already been used or expired' });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Pay via link (public — creates transaction and returns checkout data)
router.post('/:linkId/pay', async (req, res) => {
  try {
    const { email } = req.body;

    const { data: link, error: linkError } = await supabase
      .from('payment_links')
      .select('*')
      .eq('link_id', req.params.linkId)
      .single();

    if (linkError || !link) {
      return res.status(404).json({ success: false, message: 'Payment link not found' });
    }

    if (link.status !== 'active') {
      return res.status(410).json({ success: false, message: 'This payment link has already been used or expired' });
    }

    const transactionRef = `MEDIREMIT-LINK-${Date.now()}`;

    // Save transaction
    const { data: tx, error: txError } = await supabase
      .from('transactions')
      .insert([{
        user_id: link.created_by,
        hospital_id: link.hospital_id,
        patient_name: link.patient_name,
        patient_id: link.patient_id,
        amount: link.amount,
        transaction_ref: transactionRef,
        description: `Payment via link for ${link.patient_name} at ${link.hospital_name}`,
        status: 'pending',
      }])
      .select()
      .single();

    if (txError) throw txError;

    // Mark link as used
    await supabase
      .from('payment_links')
      .update({ status: 'used' })
      .eq('link_id', req.params.linkId);

    res.json({
      success: true,
      transactionRef,
      amount: link.amount,
      hospitalName: link.hospital_name,
      patientName: link.patient_name,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
