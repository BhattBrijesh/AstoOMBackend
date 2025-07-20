const mongoose = require("mongoose");
const contactUsModal = require("../models/contactUs.model");
const {
  validateInsertContactUsDetails,
} = require("../validators/contactUs.validator");

const nodemailer = require("nodemailer");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.handleAddContactUsDetails = async (req, res) => {
  try {
    // Validate input
    const validationErrors = validateInsertContactUsDetails(req.body);
    if (validationErrors?.length > 0) {
      return res.status(400).json({ message: validationErrors.join(", ") });
    }

    const { name, email, phone, message } = req.body;

    // Check MongoDB connection state
    console.log("Mongoose connection state:", mongoose.connection.readyState);
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected");
    }

    // Insert contact details
    console.log("Attempting to insert contact details:", req.body);
    const insertContactDetails = await contactUsModal.create(
      { name, phone, email, message },
      { timeoutMs: 30000 }
    );
    console.log("Insert successful:", insertContactDetails);

    // Prepare email options for admin notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_RECEIVING_EMAIL,
      subject: "New Contact Form Submission from Your Website",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br>
        <small>Received on: ${new Date().toLocaleString()}</small>
      `,
    };

    // Prepare email options for user confirmation
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting AstroOM Solution!",
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to AstroOM Solution. We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><em>"${message}"</em></p>
        <p>We appreciate your patience.</p>
        <p>Best regards,</p>
        <p>The AstroOM Solution Team</p>
      `,
    };

    // Send emails
    try {
      await transporter.sendMail(adminMailOptions);
      console.log("Admin notification email sent successfully.");
    } catch (emailError) {
      console.error("Error sending email to admin:", emailError.message);
    }

    try {
      await transporter.sendMail(userMailOptions);
      console.log("User confirmation email sent successfully.");
    } catch (emailError) {
      console.error(
        "Error sending confirmation email to user:",
        emailError.message
      );
    }

    // Send response to frontend
    return res.status(201).json({
      message: "Contact details saved and emails triggered successfully!",
      data: insertContactDetails,
    });
  } catch (error) {
    console.error("Error while inserting contact details:", error.message);
    return res.status(500).json({
      message: "Internal server error: " + error.message,
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
