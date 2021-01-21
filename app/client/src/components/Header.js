import React from "react";
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    transform: "translatez(0)",
  },
  searchInput: {
    opacity: "0.6",
    color: "#000",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    border: "solid 1px #efefef",
    borderRadius: "1rem",
    backgroundColor: "#daddef",
    "&:hover": {
      border: "solid 1px #969696",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search ..."
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <PowerSettingsNewIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
