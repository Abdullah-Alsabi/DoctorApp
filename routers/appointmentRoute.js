const Router = require("express");
const router = Router();
const Appointment = require("../models/AppointmentSchema");

//add appintment to the collection
router.post("/createAppointment", async (req, res) => {
  const NewAppointment = new Appointment({
    date: req.body.date,
    patientName: req.body.patientName,
    reasonForAppointment: req.body.reasonForAppointmentm,
    _idDoc: req.body._idDoc,
    _idPat: req.body._idPat,
  });

  try {
    const theAppointment = await NewAppointment.save();
    res.status(200).send(theAppointment);
  } catch (e) {
    console.error(e);
  }
});

// get all Appointment
router.get("/getAppointments", async (req, res) => {
  try {
    Appointment.find({}).then((appintment) => {
      res.send(appintment);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// get Appointment by id
router.get("/singleAppointment/:id", (req, res) => {
  const { id } = req.params;
  Appointment.findById(id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// update Appointment
router.patch("/updateAppointment/:id", (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) console.log(err);
    res.json("Appointment updated!");
  });
});

// delete appointment
router.delete("/deleteAppointment/:id", (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => {
      Appointment.find()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
