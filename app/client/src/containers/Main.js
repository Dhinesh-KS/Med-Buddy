import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  FormControl,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../components/controls/index";
import Modal from "../components/Modal";
import AppointmentForm from "../components/AppointmentForm";
import useTable from "../components/useTable";
import PageHeader from "../components/PageHeader";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Search } from "@material-ui/icons";
import moment from "moment";
import SnackBar from "../components/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { httpClient } from "../services/api/Provider";
import { records } from "../data/SampleRecords";

const headCells = [
  { id: "name", label: "Patient Name" },
  { id: "mobile", label: "Mobile Number" },
  { id: "city", label: "City" },
  { id: "gender", label: "Gender", disableSorting: true },
  { id: "session", label: "Session" },
  { id: "appointmentDate", label: "AppointmentDate" },
  { id: "startTime", label: "StartTime" },
  { id: "endTime", label: "EndTime" },
];

export const getSession = () => [
  { id: "morning", title: "Morning" },
  { id: "evening", title: "Evening" },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "25%",
    paddingRight: theme.spacing(1),
  },
  newButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(10),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(10),
    },
  },
}));

function Main(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [slots, setSlots] = useState([]);
  const [sessionBasedRecords, setSessionBasedRecords] = useState([]);
  const [adf, setAdf] = useState(new Date());

  // useEffect(() => {
  //   setLoading(true);
  //   httpClient
  //     .getSlots()
  //     .then((res) => {
  //       setSlots(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    filterBySession();
  }, [sessionId, adf]);

  const filterBySession = () => {
    if (sessionId !== "") {
      let record = records.filter(
        (item) =>
          item.session === sessionId && item.appointmentDate === moment(adf).format("MM/DD/YYYY")
      );
      setSessionBasedRecords(record);
    } else {
      let record = records.filter(
        (item) => item.appointmentDate === moment(adf).format("MM/DD/YYYY")
      );
      setSessionBasedRecords([...record]);
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    sessionBasedRecords,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.name.toLowerCase().includes(target.value));
      },
    });
  };

  const addOrEdit = (data, resetForm) => {
    data.appointmentDate = moment(data.appointmentDate).format("MM/DD/YYYY");
    data.startTime = moment(data.startTime).toISOString();
    data.endTime = moment(data.endTime).toISOString();
    resetForm();
    setOpenModal(false);
    setLoading(true);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleChange = (event) => {
    setSessionId(event.target.value);
  };

  const handleFilterByDate = (event) => {
    setAdf(event.target.value);
  };

  return (
    <>
      <PageHeader
        title="Appointment Details"
        subTitle="View / Create appointment slots"
        icon={<PeopleAltIcon />}
      />
      <Paper className={classes.pageContent}>
        <Controls.Button
          text="Add New"
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.newButton}
          onClick={() => {
            setOpenModal(true);
          }}
        />
        <Toolbar>
          <Controls.Input
            label="Search Patients"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.DatePicker
            name="appointmentDate"
            label="Appointment Date"
            value={adf}
            onChange={handleFilterByDate}
          />
          <FormControl className={classes.formControl}>
            <Controls.Select
              name="sessionSelect"
              label="Select Session"
              value={sessionId}
              onChange={handleChange}
              options={getSession()}
              className="sessionSelect"
            />
          </FormControl>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {loading === false &&
              recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.session}</TableCell>
                  <TableCell>{item.appointmentDate}</TableCell>
                  <TableCell>
                    {moment(item.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                  <TableCell>
                    {moment(item.endTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                </TableRow>
              ))}
            {loading === true && (
              <div className={classes.root}>
                <CircularProgress />
              </div>
            )}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Modal title="Appointment Form" openModal={openModal} setOpenModal={setOpenModal}>
        <AppointmentForm addOrEdit={addOrEdit} />
      </Modal>
      <SnackBar notify={notify} setNotify={setNotify} />
    </>
  );
}

export default Main;
