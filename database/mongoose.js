const mongoose = require("mongoose");
const connectionPath = process.env.CONNECTION_MONGO.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);
const myDatabase = async () => {
  try {
    await mongoose.connect(connectionPath, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  } catch (error) {}
};

module.exports = myDatabase;
