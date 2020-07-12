import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '2em',
    right: '2em',
    cursor: 'pointer',
    '& > *': {
      margin: theme.spacing(1),
    },
    '&:hover': {
      '& > span': {
        '& > div': {
          backgroundColor: (props) => props.theme?.hovered,
          boxShadow: '0 2px 4px rgba(0,0,0,.5)',
          '& > span': {
            boxShadow: '-1px -2px 4px rgba(0,0,0,.5)',
          }
        }
      }
    }
  },
  shape: {
    backgroundColor: (props) => props.theme?.color || "#6e00c8",
    width: 80,
    height: 80,
  },
  shapeCircle: {
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    transition: '.2s ease-in-out'
  },
  icon: {
    color: "#fff",
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  }
}));

export default function BadgeOverlap() {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const { list } = useSelector((GlobalState) => GlobalState.notifs);
  const classes = useStyles({ theme: mytheme });
  const circle = <div className={cx(classes.shape, classes.shapeCircle)}> <NotificationsIcon fontSize="large" className={classes.icon} /> </div>;
  return (
    <div className={classes.root}>
      <Badge color="secondary" overlap="circle" badgeContent={list.length}>
        {circle}
      </Badge>
    </div>
  );
};
