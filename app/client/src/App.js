import React from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "20%",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideBar />
      <div className={classes.appMain}>
        <Header />
      </div>
      <CssBaseline />
      {/* <Sample/> */}
    </ThemeProvider>
  );
}

export default App;
