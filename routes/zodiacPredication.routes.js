const express = require("express");
const {
  zodiacPrediction,
} = require("../controllers/zodiacPrediction.Controllers");
const router = express.Router();
router.get("/getZodiacDaily", zodiacPrediction);
exports.ZodiacRoutes = router;
