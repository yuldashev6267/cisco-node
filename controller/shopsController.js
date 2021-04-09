const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ShopsModel = require("../model/shopsModel");
const photos = path.join(__dirname, "../public/img/shops");
exports.createShops = async (req, res) => {
  try {
    if (req.file) {
      req.body.photo = req.file.filename;
    }
    const shop = await ShopsModel.create({
      photo: req.body.photo,
      shopName: req.body.shopName,
      url: req.body.url,
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
      docs: shops.length,
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
    const allowedUpdates = ["photo", "shopName", "description", "number"];
    const isAllowed = updates.every((el) => allowedUpdates.includes(el));
    if (!isAllowed) {
      return res.status(400).json({
        status: "fail",
        message: "there is no name such a update",
      });
    }
    const shop = await ShopsModel.findById(req.params.id);
    updates.forEach((el) => {
      shop[el] = req.body[el];
    });
    if (req.file) {
      fs.unlink(`${photos}/${shop.photo}`, (error) => {
        console.log(error);
      });
    }
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
    const shop = await ShopsModel.findOne({ _id: req.params.id });
    if (!shop) {
      return res.status(404).json({
        status: "fail",
        message: "There is no shop with that id",
      });
    }

    fs.unlink(`${photos}/${shop.photo}`, (error) => {
      console.log(error);
    });
    await shop.remove();
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
