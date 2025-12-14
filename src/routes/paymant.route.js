const router = require("express").Router();
const crypto = require("crypto");

const db = require("../models");
const { paymobHmac } = require("../config/env");
const verifyToken = require("../middleware/verifyToken");
const { isStudent, addDays } = require("../utils/general");
const {
  getAuthToken,
  createOrder,
  getPaymentKey,
} = require("../middleware/paymentGateway");

router.post("/create", async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const user = verifyToken(auth);
    if (isStudent(user)) {
      return res
        .status(403)
        .json({ error: "Students are not allowed to make payments" });
    }

    const { amountCents, merchant_order_id, billingData } = req.body;

    if (!amountCents || !merchant_order_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const authToken = await getAuthToken();
    const orderId = await createOrder(
      authToken,
      amountCents,
      merchant_order_id
    );
    const paymentKey = await getPaymentKey(
      authToken,
      amountCents,
      orderId,
      billingData
    );

    res.json({ paymentKey });
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment" });
  }
});

router.post("api/paymob/webhook", async (req, res) => {
  try {
    const data = req.body;
    const receivedHmac = req.body.hmac;
    delete data.hmac;

    const sorted = {};
    Object.keys(data)
      .sort()
      .forEach((key) => {
        sorted[key] = data[key];
      });

    const hashed = crypto
      .createHmac("sha512", paymobHmac)
      .update(JSON.stringify(sorted))
      .digest("hex");

    if (hashed !== receivedHmac) {
      return res.status(400).json({ error: "Invalid HMAC signature" });
    }

    const success = data.success;
    const studentId = data.merchant_order_id;
    const roadmapId = data.order.id;
    const durationDays = 30;

    if (success) {
      const expiresAt = addDays(new Date(), durationDays);

      await db.studentSubscription.create({
        studentId,
        roadmapId,
        premium: true,
        expiresAt,
      });

      return res.status(200).json("تم الدفع بنجاح");
    }
    return res.status(500).json({ error: "Payment failed" });
  } catch (error) {
    res.status(500).json({ error: "Webhook handling failed" });
  }
});

module.exports = router;
