const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRoutes = require("./Components/User/UserRoutes");
const eventRoutes = require("./Components/Events/EventRoutes");
const app = express();
const formatResponse = require("./Components/Utilities/FormatResponse");

//--------------------- Important Middlewares --------------------

app.use(express.json()); //Inbuilt body-parser middleware
app.use(
  //Inbuilt url query string parser
  express.urlencoded({
    extended: true
  })
);
app.use(cookieParser());

//----------------------- Stage Specific Middlewares-------------------

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//api routes

app.use(`/api/v1/user`, userRoutes);
app.use(`/api/v1/events`, eventRoutes);

//Handler for any invalid request
app.all("*", (req, res, next) => {
  // implement a 404 page
});

//Global Error handler
app.use((err, req, res, next) => {
  // console.log(err.stack);
  const statusCode = err.statusCode || 500;
  const statusMessage = err.statusMessage || "error";
  const errorMessage = err.message || "Internal Server Error";

  const response = formatResponse(statusCode, null, errorMessage);
  return res.status(statusCode).json(response);
});

module.exports = app;
