import React from "react";
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from "@material-ui/core";
import Controls from "./controls/index";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(8),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export default function Modal(props) {
  const { title, children, openModal, setOpenModal } = props;
  const classes = useStyles();

  return (
    <Dialog open={openModal} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
