const mongoose = require("mongoose");


const PatientSchema = mongoose.Schema({
    _id: {  type: Number, required: "Patient ID should be provided" },
    name: { type: String, required: "Patient name should be provided" },
    age: {  type: Number, required: "Patient age should be provided" },
})

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;