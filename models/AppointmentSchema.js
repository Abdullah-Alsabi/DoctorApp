const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, "Add date"],
    },

    patientName: {
      type: String,
      required: [true, "can't be blank"],
    },

    reasonForAppointment: {
      type: String,
    },
    _idDoc: {
      type: Number,
      required: [true, "can't be blank"],
      unique: true,
    },
    _idPat: {
      type: Number,
      required: [true, "can't be blank"],
      unique: true,
    },
  },
  { new: true }
);
const Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;
