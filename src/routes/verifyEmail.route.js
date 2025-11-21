const router = require("express").Router();

const db = require("../models");

//database ده الجوه ال jwt الخاص بل Token ده مش ال

router.get('/', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send("Missing token");
    }

    const user = await db.User.findOne({ where: { emailToken: token } });
    if (!user) return res.status(404).send("Invalid or expired token");

    user.emailVerified = true;
    user.emailToken = null;
    await user.save();

    return res.send("✅ Email verified successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router