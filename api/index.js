require("dotenv").config();
const express = require("express");

const { contactUsRoutes } = require("../routes/contactUs.routes");
const { InquiryRoutes } = require("../routes/Inquiry.routes");
const authRoutes = require("../routes/auth");

const app = express();
const cors = require("cors");
const { handleDbConnection } = require("../connection");
const { ZodiacRoutes } = require("../routes/zodiacPredication.routes");

// env variables
const PORT = 3000;

const dbConnectUrl = process.env.MONGOOSE_CONNECTION_URL;

// This allows all origins by default
app.use(cors());
// middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection

handleDbConnection(dbConnectUrl, app, PORT).catch((err) =>
  console.error("Failed to connect to MongoDB:", err.message)
);
// routes
app.use("/api", contactUsRoutes);
app.use("/api", InquiryRoutes);
app.use("/api", ZodiacRoutes);
app.use("/api/auth", authRoutes);

//server
