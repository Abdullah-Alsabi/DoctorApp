const Router = require("express");
const router = Router();
const Appointment = require("../models/AppointmentSchema");
const Doctor = require("../models/Doctor");

router.post("/appointment/:id", async (req, res) => {
  const _id = req.params.id;
  const doc = await Doctor.findById(req.params.id);

  const NewAppointment = new Appointment({
    date: req.body.date,
    patientName: req.body.patientName,
    reasonForAppointment: req.body.reasonForAppointmentm,
  });

  doc.appointment.push(NewAppointment);

    try {
      await doc.save();
      res.status(200).send(NewAppointment);
     
    } catch (e) {
      console.error(e);
    }
});



module.exports = router;
