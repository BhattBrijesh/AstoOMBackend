const mongoose = require("mongoose");
const contactUsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "first name is required"],
    max: [50, "maximum 50 character are allowed"],
    min: [1, "minimum 1 character are allowed"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (phone) {
        return /^\d{10}$/.test(phone);
      },
      message: (props) => `${props.value} Please fill a valid phone number!`,
    },
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.value} Please fill a valid email address!`,
    },
    required: [true, "email is required"],
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const contactUsModal = mongoose.model("ContactUs", contactUsSchema);
module.exports = contactUsModal;
