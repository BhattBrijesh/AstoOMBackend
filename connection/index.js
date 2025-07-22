const mongoose = require("mongoose");
exports.handleDbConnection = async (url = "", app, PORT) => {
  try {
    await mongoose
      .connect(`${url}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
      })
      .then(() => {
        console.log("DB Connected Successfully");
        app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
      })
      .catch((error) => {
        console.log("error while connection DB", error?.message);
      });
  } catch (error) {
    console.log("error while connection DB", error?.message);
  }
};
