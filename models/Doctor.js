const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  specialty: {
    type: String,
    required: true,
  },

  pic: {
    type: String,
    default:
      "https://static.toiimg.com/thumb/imgsize-433631,msid-77794986,width-400,resizemode-4/77794986.jpg",
  },
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
});
const Doctor = mongoose.model("doctor", DoctorSchema);
module.exports = Doctor;
