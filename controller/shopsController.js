const ShopsModel = require("../model/shopsModel");
const multer = require("multer");

exports.createShops = async (req, res) => {
  try {
    const shop = await ShopsModel.create({
      shopName: req.body.shopName,
      description: req.body.description,
      number: req.body.number,
      location: req.body.location,
    });
    res.status(201).json({
      status: "success",
      data: {
        shop,
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

exports.getAllShops = async (req, res) => {
  try {
    const shops = await ShopsModel.find();
    res.status(200).json({
      status: "success",
      data: {
        shops,
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

exports.updateShops = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["shopName", "description", "number"];
    const isAllowed = updates.every((el) => allowedUpdates.includes(el));
    if (isAllowed) {
      return res.status(400).json({
        status: "fail",
        message: "there is no name such a update",
      });
    }
    const shop = await ShopsModel.findById(req.params.id);
    updates.forEach((el) => {
      shop[el] = req.body[el];
    });
    await shop.save();
    res.status(200).json({
      status: "success",
      data: {
        shop,
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

exports.deleteShop = async (req, res) => {
  try {
    const shop = await ShopsModel.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({
        status: "fail",
        message: "There is no shop with that id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
      stack: error.stack,
    });
  }
};
