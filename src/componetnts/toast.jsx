import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ToDoListContext } from "./ToDoList";

const Toast = () => {
  const { open, handleClose, message } = useContext(ToDoListContext);
  
  if (open) {
    return;
  }

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success">{message}</Alert>
    </Snackbar>
  );
};

export default Toast;
