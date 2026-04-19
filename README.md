# AstoOMBackend

A scalable backend API built with **Node.js** and **Express.js** for the AstoOM astrology platform. This project powers the frontend application with secure authentication, business APIs, astrologer services, and third-party integrations such as zodiac/rashi data services.

## 🚀 Features

* RESTful API architecture
* User Registration & Login
* JWT Authentication
* Protected Routes with Middleware
* Role-based Access Control
* Third-party API Integration for Rashi / Zodiac Data
* Contact / Inquiry APIs
* Email Service Integration
* Validation Middleware
* MongoDB Database Integration
* Error Handling Middleware
* Modular MVC Folder Structure
* Ready for Deployment

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Nodemailer
* Express Middleware
* dotenv
* Vercel Deployment

## 📁 Project Structure

```text id="7e8n3v"
AstoOMBackend/
│── api/
│── config/
│── connection/
│── controllers/
│── middleware/
│── models/
│── routes/
│── validators/
│── .gitignore
│── README.md
│── package.json
│── package-lock.json
│── vercel.json
```

## ⚙️ Installation

```bash id="4hnx4m"
git clone <your-repository-url>
cd AstoOMBackend
npm install
```

## 🔐 Environment Variables

Create a `.env` file:

```env id="ubpvj7"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
THIRD_PARTY_API_KEY=your_api_key
```

## ▶️ Run Project

### Development

```bash id="it9w5q"
npm run dev
```

### Production

```bash id="cddm4l"
npm start
```

## 🌐 Main API Modules

* Authentication APIs
* User Management APIs
* Astrologer Profile APIs
* Contact / Inquiry APIs
* Zodiac / Rashi APIs
* Email Notification APIs

## 🔒 Security Features

* JWT Token Verification
* Middleware Authorization
* Password Hashing
* Input Validation
* Protected Endpoints
* Environment Variable Protection

## 🔗 Third-Party Integrations

* Zodiac / Rashi Data APIs
* Email Services
* External Utility APIs

## 📈 Future Improvements

* Refresh Token System
* Payment Gateway
* Appointment Booking APIs
* Admin Dashboard APIs
* Real-time Chat APIs
* Analytics APIs
* Swagger Documentation

## 👨‍💻 Author

Brijesh Bhatt

## 📄 License

ISC
