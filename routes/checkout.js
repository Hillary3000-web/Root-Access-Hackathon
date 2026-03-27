const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();

// Generate Interswitch web checkout
router.post("/pay", (req, res) => {
  const { amount, email, hospitalName, patientName, transactionRef, origin } = req.body;

  const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
  const payableCode = process.env.INTERSWITCH_PAYABLE_CODE;
  const amountInKobo = amount * 100;

  const checkoutData = {
    merchantCode,
    payableCode,
    customerId: email,
    customerEmail: email,
    amount: amountInKobo,
    transactionReference: transactionRef,
    currency: "NGN",
    redirectUrl: `${origin || process.env.FRONTEND_URL || 'https://mediremit.vercel.app'}/payment/callback`,
    description: `Payment for ${patientName} at ${hospitalName}`,
  };

  res.json({
    success: true,
    checkoutUrl: "https://qa.interswitchng.com/collections/w/pay",
    checkoutData,
    transactionRef,
  });
});

// Removed custom callback logic since the frontend Receipt handles it directly

module.exports = router;
