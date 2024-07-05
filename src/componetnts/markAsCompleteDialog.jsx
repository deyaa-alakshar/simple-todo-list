import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MarkAsCompleteDialog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="text-center">
          <DialogTitle id="alert-dialog-title">Mark as complete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to mark this task as completed
            </DialogContentText>
          </DialogContent>
        </div>
        <DialogActions>
          <Button fullWidth onClick={props.handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={props.handleMarkAsComplete}
            color="success"
            variant="contained"
            autoFocus
          >
            Mark
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MarkAsCompleteDialog;
