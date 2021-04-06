const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log(file.mimetype);
    cb(null, `shops-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new Error("Not an image! Please upload an image."), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `shops-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("png")
    .png({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
exports.uploadUserPhoto = upload.single("photo");
