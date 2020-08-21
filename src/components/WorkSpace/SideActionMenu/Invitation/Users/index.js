import React from "react";
import {
  Container, Typography, Paper, Avatar, withStyles, Badge
} from '@material-ui/core';

import Menu from './Menu';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: (props) => (props.isonline ? '#44b700' : '#ff0000'),
    color: (props) => (props.isonline ? '#44b700' : '#ff0000'),
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

export default ({ classes, user }) => (
  <Paper className={classes.paper}>
    <Container className={classes.userContainer}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        isonline={Boolean(user.socketID)}
      >
        <Avatar className={classes.avatar}>
          {user.username.substring(0, 1)}
        </Avatar>
      </StyledBadge>
      <Typography className={classes.username}> {user.username} </Typography>
    </Container>
    <Menu classes={classes} user={user} />
  </Paper>
);
