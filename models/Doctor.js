const mongoose = require("mongoose");
const Appointmemt = require("./AppointmentSchema").schema;

const DoctorSchema = new mongoose.Schema(
  {
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
    },
    
    appointment: [Appointmemt],
  }
);
const Doctor = mongoose.model("doctor", DoctorSchema);
module.exports = Doctor;
