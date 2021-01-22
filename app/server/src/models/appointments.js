const mongoose = require("mongoose");
const moment = require("moment");
const validator = require("validator");

const appointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  mobile: {
    type: Number,
    required: true,
    maxlength: 10,
  },
  city: {
    type: String,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    trim: true,
    lowercase: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
    validate(value) {
      if (value < new Date()) {
        throw new Error("Appointment date is invalid");
      }
    },
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

appointmentSchema.pre("save", async function (next) {
  const appointments = this;
  try {
    const doc = await Appointment.findOne({ email: appointments.email }).exec();
    if (doc && doc.length != 0) {
      next(new Error("Email already used"));
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
});

appointmentSchema.pre("save", async function (next) {
  const appointments = this;
  try {
    let beginningTime = moment(appointments.startTime);
    let endTime = moment(appointments.endTime);
    if (!beginningTime.isBefore(endTime)) {
      next(new Error("Start time should be before end time"));
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
});

appointmentSchema.pre("save", async function (next) {
  const appointments = this;
  try {
    const appointmentDate = moment(appointments.appointmentDate).format("YYYY-MM-DD");
    const doc = await Appointment.find({ appointmentDate })
      .where("startTime")
      .lt(appointments.endTime)
      .where("endTime")
      .gt(appointments.startTime)
      .exec();
    if (doc && doc.length != 0) {
      next(new Error("Slot was already booked"));
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = { Appointment };
