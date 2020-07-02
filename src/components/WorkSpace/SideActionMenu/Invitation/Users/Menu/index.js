import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from "react-redux";


export default ({ user, classes }) => {
  const { invitationLink, tab } = useSelector((GlobalState) => GlobalState.sockets.currentSocket);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSendInvitation = () => {
    console.log(user);
    // TODO: Send inv
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
