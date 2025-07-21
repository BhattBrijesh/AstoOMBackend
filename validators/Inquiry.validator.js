exports.validateInsertInquiryDetails = (data) => {
  const {
    name = "",
    phone = "",
    email = "",
    subject = "",
    message = "",
  } = data || {};
  const errors = [];

  if (!name.trim()) {
    errors.push("Name is required");
    console.log("name", name);
  }

  if (!phone.trim()) {
    errors.push("Phone number is required");
  }

  return errors;
};
