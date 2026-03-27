const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Get access token from Interswitch
async function getAccessToken() {
  const credentials = Buffer.from(
    `${process.env.INTERSWITCH_CLIENT_ID}:${process.env.INTERSWITCH_SECRET_KEY}`
  ).toString("base64");

  const response = await axios.post(
    `${process.env.INTERSWITCH_BASE_URL}/passport/oauth/token?grant_type=client_credentials`,
    {},
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
}

// Initiate payment
router.post("/initiate", async (req, res) => {
  try {
    const { amount, email, hospitalName, patientName } = req.body;

    const token = await getAccessToken();

    const paymentData = {
      merchantCode: process.env.INTERSWITCH_CLIENT_ID,
      payableCode: "9405967",
      amount: amount * 100,
      redirectUrl: "http://localhost:3000/payment/callback",
      currencyCode: "566",
      customerId: email,
      customerEmail: email,
      transactionReference: `MEDIREMIT-${Date.now()}`,
      description: `Payment for ${patientName} at ${hospitalName}`,
    };

    res.json({
      success: true,
      message: "Payment initiated",
      data: paymentData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error.response?.data || "No details",
    });
  }
});

module.exports = router;
