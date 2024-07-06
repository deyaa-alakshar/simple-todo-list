import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import UseTodoListContext from "../hooks/useTodoListContext";

const EditeDialog = () => {
  const [titel, setTitle] = useState("");
  const { settings, handleClose, handleEdit } = UseTodoListContext();

  useEffect(() => {
    setTitle(settings.selected?.todo || "");
  }, [settings.selected]);

  if (!settings.openEdite) {
    return null;
  }

  return (
    <Dialog
      open={settings.openEdite}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      // PaperProps={{style: {backgroundColor: "#121212"}}}
    >
      <div className="text-center">
        <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Change your task title to new one
          </DialogContentText>
          <div>
            <label className="font-semibold text-white text-xs mb-1 block">
              Title
            </label>
            <TextField
              className="bg-white rounded-md"
              size="small"
              fullWidth={true}
              variant="outlined"
              placeholder="Please write your todo title"
              value={titel}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: 400 }}
            />
          </div>
        </DialogContent>
      </div>
      <DialogActions>
        <Button fullWidth onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={() => handleEdit(titel)}
          color="warning"
          variant="contained"
          autoFocus
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditeDialog;
