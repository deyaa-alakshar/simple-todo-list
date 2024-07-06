import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UseTodoListContext from "../hooks/useTodoListContext";

const DeleteDialog = () => {
  const { settings, handleClose, handleDelete } = UseTodoListContext();

  if (!settings.openDelete) {
    return null;
  }

  return (
    <Dialog
      open={settings.openDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="text-center">
        <DialogTitle id="alert-dialog-title">Deleting the task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the task
          </DialogContentText>
        </DialogContent>
      </div>
      <DialogActions>
        <Button fullWidth onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={handleDelete}
          color="error"
          variant="contained"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
