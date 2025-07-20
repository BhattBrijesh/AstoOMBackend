const express = require("express");
const {
  handleAddContactUsDetails,
  handleGetContactUsDetails,
} = require("../controllers/contactUs.Controllers");
const router = express.Router();
router
  .get("/getContactDetails", handleGetContactUsDetails)
  .post("/insertContractDetails", handleAddContactUsDetails);
exports.contactUsRoutes = router;
