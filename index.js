const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/payment");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "MediRemit API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const hospitalRoutes = require("./routes/hospitals");
app.use("/hospitals", hospitalRoutes);

const checkoutRoutes = require("./routes/checkout");
app.use("/checkout", checkoutRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const transactionRoutes = require('./routes/transactions');
app.use('/transactions', transactionRoutes);