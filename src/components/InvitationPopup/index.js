import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Tooltip
} from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { accept, decline } from "../../store/InvitationsPopup/actions";
import { acceptFriendInvitation } from "../../store/Socket/actions";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default () => {
  const dispatch = useDispatch();
  const {
    isOpen,
    message,
    link,
    owner,
    isInvitationToBeFriend,
  } = useSelector((GlobalState) => GlobalState.invitationPopup);

  const handleDecline = () => {
    dispatch(decline(owner));
  };

  const handleAccept = () => {
    if (!isInvitationToBeFriend) {
      window.location.href = link;
      dispatch(accept());
    }
    else {
      dispatch(acceptFriendInvitation(owner, false));
      dispatch(accept());
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDecline}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Vous avez reçu une invitation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecline} color="primary">
            Décliner
          </Button>
          <Tooltip title="Redirection vers le tableau de votre contact">
            <Button onClick={handleAccept} color="primary">
              Accepter
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
};
