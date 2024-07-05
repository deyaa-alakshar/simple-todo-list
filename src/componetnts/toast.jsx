import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Toast = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={2000}
      onClose={props.handleClose}
    >
      <Alert severity="success">{props.message}</Alert>
    </Snackbar>
  );
};

export default Toast;
