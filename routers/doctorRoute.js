const router = require("express").Router();
const Doctor = require("../models/Doctor");

router.post("/createDectore", async (req, res) => {
  const dector = new Doctor({
    name: req.body.name,
    specialty: req.body.specialty,
    pic: req.body.pic,
    _id: req.body._id,
  });

  try {
    const NewDector = await dector.save();
    res.status(200).json(NewDector);
  } catch (e) {
    res.status(500);
  }
});

router.get("/doctors", async (req, res) => {
  try {
    Doctor.find({}).then((dector) => {
      res.send(dector);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/doctors/:id", (req, res) => {
  const { id } = req.params;
  Doctor.findById(id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch("/updatedoctor/:id", (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) console.log(err);
    res.json("doctor updated!");
  });
});

router.delete("/deletedoctor/:id", (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .then(() => {
      Doctor.find()
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

router.post("/upload", (req, res) => {
  res.status(200).json({
    success: "Success",
  });
});
module.exports = router;
