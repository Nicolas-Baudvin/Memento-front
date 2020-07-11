import React from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  makeStyles,
  withStyles,
  Badge
} from "@material-ui/core";
import { useSelector } from "react-redux";

import Menu from './Menu';
import { useEffect } from "react";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: (props) => (props.isonline === "true" ? '#44b700' : '#ff0000'),
    color: (props) => (props.isonline === "true" ? '#44b700' : '#ff0000'),
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

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: (props) => props.theme?.color || "#6e00c8",
    fontWeight: 'bold'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: '.2em 1em',
    margin: '1em 0'
  },
  friends: {
    margin: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto'
  }
}));

export default () => {
  const { list } = useSelector((GlobalState) => GlobalState.friends);
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  return (
    <Container className={classes.friends}>
      {
        list.map((friend) => <Paper key={friend.username} className={classes.paper}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            isonline={friend.isOnline ? "true" : "false"}
          >
            <Avatar className={classes.avatar}>
              {friend.username.substring(0, 1)}
            </Avatar>
          </StyledBadge>
          <Typography> {friend.username} </Typography>
          <Menu />
        </Paper>)
      }
    </Container>
  );
};
