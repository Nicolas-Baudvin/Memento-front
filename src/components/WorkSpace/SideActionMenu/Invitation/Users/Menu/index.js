import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';


export default ({ user, classes }) => {
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
      <MenuItem onClick={handleClickSendInvitation}>Inviter {user.username}</MenuItem>
      <MenuItem className={classes.close} onClick={handleClose}>Fermer le menu</MenuItem>
    </Menu>
  </>
  );
};
