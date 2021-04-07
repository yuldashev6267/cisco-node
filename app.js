const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");

const userReqRouter = require("./routes/userReqRouter");
const adminRouter = require("./routes/adminRouter");
const shopsRouter = require("./routes/shopsRouter");

const app = express();
app.enable("trust proxy");

app.use(cors());

app.options("*", cors());
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(xss());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(compression());

app.use("/api", userReqRouter);
app.use("/api", adminRouter);
app.use("/api", shopsRouter);

module.exports = app;
