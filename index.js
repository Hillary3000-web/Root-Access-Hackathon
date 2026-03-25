const express = require("express");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/payment");
const hospitalRoutes = require("./routes/hospitals");
const checkoutRoutes = require("./routes/checkout");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "MediRemit API running" });
});

app.use("/payment", paymentRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));