const mongoose = require("mongoose");
exports.handleDbConnection = async (url = "") => {
  try {
    await mongoose
      .connect(`${url}`)
      .then(() => {
        console.log("DB Connected Successfully");
      })
      .catch((error) => {
        console.log("error while connection DB", error?.message);
      });
  } catch (error) {
    console.log("error while connection DB", error?.message);
  }
};
