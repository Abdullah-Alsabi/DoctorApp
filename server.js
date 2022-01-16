const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const cookieParser = require("cookie-parser");
const doctorRoute = require("./routers/doctorRoute");
const appointmentRoute = require("./routers/appointmentRoute");
const authRoute = require("./routers/auth")
const patientRoute = require("./routers/patientRoute");

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
app.use("/patient", patientRoute)
app.use("/auth", authRoute)

in the server before listen to port put this
 app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});
also require path
const path = require("path");
and the port
const PORT = process.env.PORT || 3001;
then put this after other uses
app.use(express.static("frontend/build"));
then in the pacjege json scripts to this
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cd frontend && npm run build",
    "install-client": "cd frontend && npm install",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm run install-client && npm run build",
    "start": "nodemon server",
    "client": "cd frontend && npm start"
  }
and becarfull to naming in the build and app.use and install client and client
app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});
