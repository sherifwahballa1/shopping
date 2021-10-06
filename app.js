const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xxs = require("xss-clean");
// check if any await exists and each if use async without await and it will change
// epress behavior and the async function will return value installed of promise
require("express-async-errors");

const { Error404, Error500 } = require("./modules/global-errors");
const { productAPI } = require("./components/products");
const { cartAPI } = require("./components/cart");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:9000", "http://localhost:4200"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "origin",
      "Access-Control-Allow-Headers",
    ],
    optionsSuccessStatus: 204,
    preflightContinue: false,
  })
);

// Prevent Clickingjacking using X-Frame-Options
// Enforcing all connections to be HTTPS
// Setting a Context-Security-Policy header
// Disabling the X-Powered-By header so attackers can’t narrow down their attacks to specific software
app.use(helmet());

// parses incoming requests with JSON payloads and Controls the maximum request body size
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// HTTP request logger middleware
app.use(morgan("tiny"));

// ====================== XXS =================================
// Data sanitization against cross-site scripting (XSS)
app.use(xxs()); // prevent if code contain html code or js code in body and convert it to symbols known

app.use("/api/v0/products", productAPI);
app.use("/api/v0/cart", cartAPI);

app.use(Error404);
app.use(Error500);

module.exports = app;
