require("dotenv").config();
const express = require("express");
const { handleDbConnection } = require("./controllers");
const app = express();

// env variables
const PORT = process.env.PORT;
const dbConnectUrl = process.env.MONGOOSE_CONNECTION_URL;

// middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
handleDbConnection(dbConnectUrl);

// routes
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

//server
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
