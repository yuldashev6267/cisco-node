const User = require("../model/userReqModel");
const Moment = require("moment");
exports.addRequest = async (req, res) => {
  try {
    const addRequest = await User.create({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      company: req.body.company,
      date: new Moment().calendar(),
    });

    res.status(201).json({ status: "success", message: "Added" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const userRequests = await User.find();
    res.status(200).json({
      status: "success",
      docs: userRequests.length,
      data: {
        userRequests,
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

exports.deleteAllRequests = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({
      status: "success",
      message: "deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "fail", message: error.message, stack: error.stack });
  }
};
