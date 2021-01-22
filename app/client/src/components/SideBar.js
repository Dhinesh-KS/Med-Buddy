import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "20%",
    height: "100%",
    backgroundColor: "#253053",
  },
  pageTitle: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

function SideMenu(props) {
  const classes = useStyles();
  return (
    <div className={classes.sideMenu}>
      <div className={classes.pageTitle}>
        <Typography variant="h6" component="div" style={{ color: "#fff" }}>
          Med-Buddy
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          style={{ color: "#fff", fontWeight: "lighter" }}
        >
          We serve you the best
        </Typography>
      </div>
    </div>
  );
}

export default SideMenu;
