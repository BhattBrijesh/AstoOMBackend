const mongoose = require("mongoose");
const contactUsModal = require("../models/contactUs.model");
const {
  validateInsertContactUsDetails,
} = require("../validators/contactUs.validator");

exports.handleAddContactUsDetails = async (req, res) => {
  try {
    const validationErrors = validateInsertContactUsDetails(req.body);
    if (validationErrors?.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    const { name, email, phone, message } = req.body;

    const insertContactDetails = await contactUsModal.create({
      name,
      phone,
      email,
      message,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: insertContactDetails,
    });
  } catch (error) {
    console.error("Error while inserting contact details:", error?.message);
    return res.status(500).json({
      message: error?.message,
    });
  }
};

exports.handleGetContactUsDetails = async (req, res) => {
  try {
    const getAllDetails = await contactUsModal.find();

    return res.status(200).json({
      message: "Users fetched successfully",
      data: getAllDetails || [],
    });
  } catch (error) {
    console.error("Error fetching contact details:", error);

    return res.status(500).json({
      message: error?.message,
    });
  }
};
