const express = require("express");
const router = new express.Router();
const { Appointment } = require("../models/appointments");

router.get("/getAppointments", async (req, res) => {
  try {
    const list = await Appointment.find({});
    res.send(list);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/createAppointment", async (req, res) => {
  const newItem = new Appointment(req.body);

  try {
    await newItem.save();
    res.status(201).send(newItem);
  } catch (e) {
    res.status(400).send(e && e.message);
  }
});

module.exports = router;
