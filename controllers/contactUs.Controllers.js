const mongoose = require("mongoose");
const contactUsModal = require("../models/contactUs.model");
const {
  validateInsertContactUsDetails,
} = require("../validators/contactUs.validator");
const transporter = require("../config/nodemailer");
const moment = require("moment-timezone");

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
    const totalCount = await contactUsModal.countDocuments();
    // Prepare Email Options for Admin Notification
    const receivedDateIST = moment()
      .tz("Asia/Kolkata")
      .format("DD-MM-YYYY hh:mm:ss A");

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
     <small>Received on: ${receivedDateIST}</small>
      `,
    };

    // Prepare Email Options for User Confirmation
    // const userMailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Thank You for Contacting Om Astro Solutions!",
    //   html: `
    //     <p>Dear ${name},</p>
    //     <p>Thank you for reaching out to Om Astro Solutions. We have received your message and will get back to you as soon as possible.</p>
    //     <p>Here's a copy of your message:</p>
    //     <p><em>"${message}"</em></p>
    //     <p>We appreciate your patience.</p>
    //     <p>Best regards,</p>
    //     <p>The Om Astro Solutions Team</p>
    //   `,
    // };
    // Prepare Email Options for User Confirmation
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Om Astro Solutions!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Us</title>
          <style>
            body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
            .header { background-color: #4a6baf; color: #ffffff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
            .content { padding: 35px; color: #333333; line-height: 1.7; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .message-box { background-color: #f8f9fc; border-left: 5px solid #4a6baf; padding: 20px; margin: 25px 0; border-radius: 6px; font-style: italic; }
            .footer { background-color: #f8f9fc; padding: 30px; text-align: center; font-size: 14px; color: #666666; }
            .footer a { color: #4a6baf; text-decoration: none; font-weight: 500; }
            .contact-info { margin: 20px 0; }
            .contact-info p { margin: 10px 0; }
            .whatsapp-btn {
              display: inline-block;
              background-color: #25D366;
              color: #ffffff !important;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              margin: 12px 0;
              font-size: 16px;
            }
            .signature { margin-top: 30px; font-weight: bold; color: #4a6baf; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Om Astro Solutions!</h1>
            </div>
            <div class="content">
              <p class="greeting">Dear ${name},</p>
              
              <p>Thank you for getting in touch with us. We have successfully received your message and truly value your interest in Om Astro Solutions.</p>
              
              <p>Our team will review it and respond to you <strong>within 24-48 hours</strong>.</p>
              
              <p><strong>Your submitted message:</strong></p>
              <div class="message-box">
                "${message}"
              </div>
              
              <p>If your matter is urgent, please don't hesitate to contact us directly using the details below.</p>
              
              <p class="signature">Best regards,<br>The Om Astro Solutions Team</p>
            </div>
            
            <div class="footer">
              <div class="contact-info">
                <p><strong>Connect with us directly:</strong></p>
                <p>Email: <a href="mailto:astroomsolution@gmail.com">astroomsolution@gmail.com</a></p>
                
                <p>
                  WhatsApp: 
                <p>
  WhatsApp: 
  <a href="https://wa.me/919417339708?text=Hello%20OM%20Astro%20Solutions,%20I%20want%20to%20contact%20you" class="whatsapp-btn">
    💬 Chat on WhatsApp (+91 94173 39708)
  </a>
</p>
                </p>
                
                <p><strong>Office Address:</strong><br>
                  Om Astro Solutions<br>
                  OM Astro Solutions<br>
                  House Number 20 Sector 11 Chandigarh <br>
                  India
                </p>
              </div>
              <p style="margin-top: 25px; font-size: 13px; color: #999;">
                © ${new Date().getFullYear()} Om Astro Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
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

    return res.status(201).json({
      message: "Contact details saved and emails triggered successfully!",
      data: insertContactDetails,
      totalCount,
    });
  } catch (error) {
    console.error("Error while inserting contact details:", error?.message);
    return res.status(500).json({ message: error?.message });
  }
};

exports.handleGetContactUsDetails = async (req, res) => {
  try {
    const getAllDetails = await contactUsModal.find().sort({ createdAt: -1 });
    const totalCount = getAllDetails.length;

    return res.status(200).json({
      message: "Users fetched successfully",
      data: getAllDetails || [],
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching contact details:", error);

    return res.status(500).json({
      message: error?.message,
    });
  }
};
