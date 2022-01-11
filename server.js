const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const cookieParser = require("cookie-parser");
const doctorRoute = require("./routers/doctorRoute");
const appointmentRoute = require("./routers/appointmentRoute");

require("dotenv").config();
// Mongoose Here
// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// msg when connect

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// connect frontend
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/appointment", appointmentRoute);
app.use("/doctor", doctorRoute);

// app.use(express.static("frontend/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});
