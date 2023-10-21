const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/connectDB");
const invalidUrlError = require("./midllevares/invalidUrlError");
const errorHandler = require("./midllevares/errorHandler");
const configPath = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: configPath });
require("colors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./routes/carsRoutes"));

app.use("*", invalidUrlError);

app.use(errorHandler);

const { PORT } = process.env;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is runin ${PORT}`.green.italic.bold);
});
