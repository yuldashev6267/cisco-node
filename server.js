const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoDB = require("./database/mongoose");
const port = process.env.PORT || 5000;

mongoDB();
app.listen(port, () => {
  console.log("Server up on running port ", port);
});
