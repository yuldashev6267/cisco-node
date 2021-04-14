const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const router = express.Router();
const userReqRouter = require("./routes/userReqRouter");
const adminRouter = require("./routes/adminRouter");
const shopsRouter = require("./routes/shopsRouter");

const app = express();

app.use(helmet());
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);
app.use(xss());
app.use((req, res, next) => {
  //to allow cross domain requests to send cookie information.
  res.header("Access-Control-Allow-Credentials", true);

  // origin can not be '*' when crendentials are enabled. so need to set it to the request origin
  res.header("Access-Control-Allow-Origin", req.headers.origin);

  // list of methods that are supported by the server
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,PATCH,POST,DELETE"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,authorization"
  );
  next();
});
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(compression());

app.use("/api", userReqRouter);
app.use("/api", adminRouter);
app.use("/api", shopsRouter);

module.exports = app;
