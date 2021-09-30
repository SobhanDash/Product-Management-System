const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//logs requests
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse request to body parser
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/api/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routes
app.use("/", require("./server/routes/router"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
