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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Controls from "../components/controls/index";
import Modal from "../components/Modal";
import AppointmentForm from "../components/AppointmentForm";
import useTable from "../components/useTable";
import PageHeader from "../components/PageHeader";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Search } from "@material-ui/icons";

const headCells = [
  { id: "fullName", label: "Patient Name" },
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

const records = [
  {
    id: "1",
    fullName: "Dhinesh KS",
    mobile: 7010114990,
    city: "Thanjavur",
    gender: "male",
    session: "morning",
    appointmentDate: "23-01-2021",
    startTime: "08.34",
    endTime: "09.00",
  },
  {
    id: "2",
    fullName: "Bhuvesh KS",
    mobile: 7010114990,
    city: "Thanjavur",
    gender: "male",
    session: "evening",
    appointmentDate: "23-01-2021",
    startTime: "08.34",
    endTime: "07.00",
  },
  {
    id: "2",
    fullName: "Ramesh S",
    mobile: 7010114990,
    city: "Thanjavur",
    gender: "male",
    session: "evening",
    appointmentDate: "23-01-2021",
    startTime: "08.34",
    endTime: "07.00",
  },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "25%",
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
}));

function Main(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [sessionId, setSessionId] = useState("morning");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [sessionBasedRecords, setSessionBasedRecords] = useState([]);

  useEffect(() => {
    filterBySession();
  }, [sessionId]);

  const filterBySession = () => {
    if (sessionId !== "") {
      let record = records.filter((item) => item.session === sessionId);
      setSessionBasedRecords(record);
    } else {
      setSessionBasedRecords([...records]);
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
        else return items.filter((x) => x.fullName.toLowerCase().includes(target.value));
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    alert("ok");
  };

  const handleChange = (event) => {
    setSessionId(event.target.value);
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
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.session}</TableCell>
                <TableCell>{item.appointmentDate}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Modal title="Appointment Form" openModal={openModal} setOpenModal={setOpenModal}>
        <AppointmentForm addOrEdit={addOrEdit} />
      </Modal>
    </>
  );
}

export default Main;
