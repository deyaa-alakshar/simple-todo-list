import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TodoListContext } from "../hooks/TodoListProvider";

const Toast = () => {
  const { settings, handleClose } = useContext(TodoListContext);

  if (!settings.openToast) {
    return;
  }

  return (
    <Snackbar
      open={settings.openToast}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert severity="success">{settings.message}</Alert>
    </Snackbar>
  );
};

export default Toast;
