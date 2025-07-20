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

    // 2. Prepare Email Options for Admin Notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER, // Sender email from .env
      to: process.env.ADMIN_RECEIVING_EMAIL, // Admin email from .env
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

    // 3. Prepare Email Options for User Confirmation (Optional but Recommended)
    const userMailOptions = {
      from: process.env.EMAIL_USER, // Your sending email address
      to: email, // The user's email address
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

    try {
      await transporter.sendMail(adminMailOptions);
      console.log("Admin notification email sent successfully.");
    } catch (emailError) {
      console.error("Error sending email to admin:", emailError?.message);
    }

    try {
      await transporter.sendMail(userMailOptions);
      console.log("User confirmation email sent successfully.");
    } catch (emailError) {
      console.error(
        "Error sending confirmation email to user:",
        emailError?.message
      );
    }

    // 5. Respond to Frontend
    return res.status(201).json({
      message: "Contact details saved and emails triggered successfully!",
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
