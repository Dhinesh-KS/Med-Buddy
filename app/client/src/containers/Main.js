import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../components/controls/index";
import Modal from "../components/Modal";
import AppointmentForm from "../components/AppointmentForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(10),
  },
}));

function Main(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const addOrEdit = (employee, resetForm) => {
    alert("ok");
  };
  return (
    <>
      <Controls.Button
        text="Add New"
        variant="contained"
        startIcon={<AddIcon />}
        className={classes.newButton}
        onClick={() => {
          setOpenModal(true);
        }}
      />
      <Modal title="Appointment Form" openModal={openModal} setOpenModal={setOpenModal}>
        <AppointmentForm addOrEdit={addOrEdit} />
      </Modal>
    </>
  );
}

export default Main;
