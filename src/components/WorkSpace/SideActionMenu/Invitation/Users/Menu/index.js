import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from "react-redux";
import { inviteFriend } from "../../../../../../store/Socket/actions";


export default ({ user, classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSendInvitation = () => {
    if (user.socketID) {
      dispatch(inviteFriend(user.socketID));
    }
  };

  return (<>
    <IconButton onClick={handleClick}>
      <MoreVertIcon className={classes.icon} />
    </IconButton>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {
        !user.socketID
        && <Tooltip title="Votre ami n'est pas connecté">
          <MenuItem className={classes.offline} onClick={handleClickSendInvitation}>Inviter {user.username}</MenuItem>
        </Tooltip>
      }
      {
        user.socketID
        && <MenuItem onClick={handleClickSendInvitation}>Inviter {user.username}</MenuItem>
      }
      <MenuItem className={classes.close} onClick={handleClose}>Fermer le menu</MenuItem>
    </Menu>
  </>
  );
};
