const mongoose = require("mongoose");
const validator = require("validator");

const Appointments = mongoose.model("Appointments", {
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
    default: Date.now,
  },
});

module.exports = { Appointments };
