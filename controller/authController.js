const jwt = require("jsonwebtoken");
const AdminModel = require("../model/adminAuthModel");
exports.createAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.create({
      adminName: req.body.adminName,
      password: req.body.password,
      role: req.body.role,
    });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        admin,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { adminName, password } = req.body;
    if (!adminName || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both admin name and password filed",
      });
    }
    const admin = await AdminModel.findOne({ adminName });
    if (!admin || !(await admin.passwordChecker(password, admin.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Неверно указан логин или пароль.",
      });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      status: "success",
      token,
      message: "You are logged in",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
      stach: error.stack000,
    });
  }
};

exports.protectTo = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Please autheniticate",
      });
    }
    const decodedUser = await jwt.decode(token, process.env.JWT_SECRET);
    if (!decodedUser) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid token provided please.Authenticate again",
      });
    }
    const admin = await AdminModel.findOne({ _id: decodedUser.id });
    req.admin = admin;

    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.adminPanelRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(400).json({
        status: "fail",
        message: "You are not admin",
      });
    }
    next();
  };
};
