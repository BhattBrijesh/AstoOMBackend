const express = require("express");
const {
  handleAddInquiryDetails,
  handleGetInquiryDetails,
} = require("../controllers/Inquiry. Controllers");
const router = express.Router();
router
  .get("/getInquiryDetails", handleGetInquiryDetails)
  .post("/insertInquiryDetails", handleAddInquiryDetails);

exports.InquiryRoutes = router;
