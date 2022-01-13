const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const Patient = require("../models/Patient");
router.use(express.json())

router.post("/", (req, res) => {
    Patient.create({
        _id: req.body.id,
        name: req.body.name,
        age: req.body.age
    }, (err) => {
        if(err) console.log(err)
        res.end();
    })

})

router.get("/", (req, res) => {
    Patient.find({}, (err, data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Patient.findOne({ _id: id }, (err, data) => {
        if(err) console.log(err);
        res.send(data);
    })
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedPatient = req.body;
    Patient.updateOne({ _id: id }, updatedPatient, (err) => {
        if(err) console.log(err);
        res.end();
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Patient.deleteOne({ _id: id }, (err) => {
        if(err) console.log(err);
        res.end();
    })
})


module.exports = router;