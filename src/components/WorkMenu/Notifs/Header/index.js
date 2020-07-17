import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

export default ({ classes, handleClick }) => {
  return (
    <div className={classes.header}>
      <IconButton color="secondary" onClick={handleClick} className={classes.iconBtn}>
        <CloseIcon className={classes.icon} />
      </IconButton>
      <Typography align="center" className={classes.title}> Notifications </Typography>
    </div>
  );
};
