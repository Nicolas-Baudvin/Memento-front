import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

// actions
import { failMessage } from "../../../store/Popup/actions";
import { deleteTab } from "../../../store/Tabs/actions";

export default ({ state, setstate, handleClose, handleOpen, tab, message }) => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    setstate({ ...state, open: false });

    if (!tab._id) {
      return dispatch(failMessage("Erreur : Cette table n'existe pas. Actualisez la pages"));
    }
    return dispatch(deleteTab(tab._id));
  };

  return (
    <div>
      <Tooltip title="Supprimer le tableau">
        <IconButton onClick={handleOpen}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle style={{ cursor: 'move' }}>
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Retour
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Supprimer le tableau
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
