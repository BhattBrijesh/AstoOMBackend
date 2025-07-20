exports.validateInsertContactUsDetails = (data) => {
  const { name = "", phone = "", email = "", message = "" } = data || {};
  const errors = [];

  if (!name.trim()) {
    errors.push("Name is required");
  }

  if (!phone.trim()) {
    errors.push("Phone number is required");
  }

  return errors;
};
