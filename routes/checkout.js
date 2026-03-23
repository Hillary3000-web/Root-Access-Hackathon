const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();

// Generate Interswitch web checkout
router.post("/pay", (req, res) => {
  const { amount, email, hospitalName, patientName, hospitalId } = req.body;

  const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE;
  const payableCode = process.env.INTERSWITCH_PAYABLE_CODE;
  const transactionRef = `MEDIREMIT-${Date.now()}`;
  const amountInKobo = amount * 100;

  const checkoutData = {
    merchantCode,
    payableCode,
    customerId: email,
    customerEmail: email,
    amount: amountInKobo,
    transactionReference: transactionRef,
    currency: "NGN",
    redirectUrl: `${process.env.BASE_URL}/checkout/callback`,
    description: `Payment for ${patientName} at ${hospitalName}`,
  };

  res.json({
    success: true,
    checkoutUrl: "https://qa.interswitchng.com/collections/w/pay",
    checkoutData,
    transactionRef,
  });
});

// Handle callback
router.get("/callback", (req, res) => {
  const { txnref, amount, respCode, respDescription } = req.query;
  res.json({
    success: respCode === "00",
    transactionRef: txnref,
    amount: amount / 100,
    status: respDescription,
  });
});

module.exports = router;
