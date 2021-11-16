const express = require("express");
const path = require("path");
const mongosoe = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/UserRoutes.js");
const TodoRoutes = require("./routes/TodoRoutes.js");
const FolderRoutes = require("./routes/FolderRoutes");
const errorMiddleware = require("./middlewars/error-middlewar.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.API_URL,
  })
);
app.options("*", cors());
app.use("/api", userRoutes);
app.use("/api", TodoRoutes);
app.use("/api", FolderRoutes);
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build"));
});
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await mongosoe
      .connect(process.env.MONGO_URI)
      .then(() => console.log("db connecteed"));
    app.listen(PORT, () => console.log(`Server runing on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

module.exports = startApp;
