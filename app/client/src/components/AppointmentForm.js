import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/index";
import { useForm, Form } from "./useForm";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const sessionItems = [
  { id: "morning", title: "Morning" },
  { id: "evening", title: "Evening" },
];

const initialFValues = {
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  session: "morning",
  appointmentDate: new Date(),
  startTime: new Date(),
  endTime: new Date(Date.now() + 30 * 60 * 1000),
};

export default function AppointmentForm(props) {
  const { addOrEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email
        ? /$^|.+@.+..+/.test(fieldValues.email)
          ? ""
          : "Email is not valid."
        : "This field is required.";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.DatePicker
            name="appointmentDate"
            label="Appointment Date"
            value={values.appointmentDate}
            onChange={handleInputChange}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
          />
          <Controls.RadioGroup
            name="session"
            label="Session"
            value={values.session}
            onChange={handleInputChange}
            items={sessionItems}
          />
          <Grid container>
            <Grid item xs={12} md={6}>
              <Controls.TimePicker
                name="startTime"
                label="StartTime"
                value={values.startTime}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.TimePicker
                name="endTime"
                label="EndTime"
                value={values.endTime}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Controls.Button type="submit" text="Submit" />
        <Controls.Button text="Reset" color="default" onClick={resetForm} />
      </div>
    </Form>
  );
}
