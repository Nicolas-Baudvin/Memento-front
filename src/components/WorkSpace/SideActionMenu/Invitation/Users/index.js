import React from "react";
import {
  Container, Typography, Paper, IconButton, Avatar
} from '@material-ui/core';

import Menu from './Menu';

export default ({ classes, user }) => {
  return (
    <Paper className={classes.paper}>
      <Container className={classes.userContainer}>
        <Avatar className={classes.avatar}>
          {user.username.substring(0, 1)}
        </Avatar>
        <Typography> {user.username} </Typography>
      </Container>
      <Menu classes={classes} user={user} />
    </Paper>
  );
};
