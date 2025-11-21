const router = require("express").Router();

const addFile = require("../middleware/addFile");
const verifyToken = require("../middleware/verifyToken");
const { throwErr } = require("../utils/general");
const db = require("../models");

router.post("/upload-image", addFile, async (req, res) => {
  try {
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    const auth = req.header.authorization || "";
    const decoded = verifyToken(auth);

    const user = await db.User.findByPk(decoded.userId);
    if (!user) {
      res.status(400).json({ message: "This user is not exist" });
    }

    user.image = imageUrl;
    await user.save();
  } catch (error) {
    throwErr(error);
  }
});
