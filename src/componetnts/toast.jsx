import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useTodoListContext from "../hooks/useTodoListContext";

const Toast = () => {
  const { settings, handleClose } = useTodoListContext();

  if (!settings.openToast) {
    return null;
  }

  return (
    <Snackbar
      open={settings.openToast}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert severity={settings.error ? "error" : "success"}>
        {settings.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
