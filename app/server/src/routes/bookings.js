const express = require("express");
const router = new express.Router();
const { Appointments } = require("../models/appointments");

router.get("/getAppointments", async (req, res) => {
  try {
    const list = await Appointments.find({});
    res.send(list);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/createAppointment", async (req, res) => {
  const newItem = new Appointments(req.body);

  try {
    await newItem.save();
    res.status(201).send(newItem);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
