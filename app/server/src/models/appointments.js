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
  session: {
    type: String,
    trim: true,
    lowercase: true,
  },
  appointmentDate: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (moment(value).format("MM/DD/YYYY") < moment().format("MM/DD/YYYY")) {
        throw new Error("Appointment date is invalid");
      }
    },
  },
  startTime: {
    type: String,
    required: true,
    trim: true,
  },
  endTime: {
    type: String,
    required: true,
    trim: true,
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
    let beginningTime = moment(appointments.startTime).format("HH");

    if (appointments.session.toLowerCase() === "morning") {
      if (beginningTime >= 8 && beginningTime < 12) {
        next();
      } else {
        next(new Error("Morning slots are only availble between 8AM to 12PM"));
        return;
      }
    }
    if (appointments.session.toLowerCase() === "evening") {
      if (beginningTime >= 17 && beginningTime < 21) {
        next();
      } else {
        next(new Error("Evening slots are only availble between 5PM to 9PM"));
        return;
      }
    }
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
    let beginningTime = moment(appointments.startTime);
    let endTime = moment(appointments.endTime);
    let timeDiff = endTime.diff(beginningTime, "minutes");
    
    if (timeDiff > 30) {
      next(new Error("Slot can only be booked for 30mins"));
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
    const doc = await Appointment.find({ appointmentDate: appointments.appointmentDate })
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
