const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/auth");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Protected route example
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log("err", error);

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
