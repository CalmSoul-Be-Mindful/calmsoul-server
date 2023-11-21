if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routers");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use(errorHandler);

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`);
// });
module.exports = app;
