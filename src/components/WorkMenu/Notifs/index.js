import React, { useState } from 'react';
import { Tooltip, IconButton, Typography, Divider, Paper, Button } from '@material-ui/core';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux';

import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '2em',
    right: '2em',
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
  openShape: {
    opacity: '0'
  },
  closeShape: {
    opacity: '1'
  },
  shape: {
    backgroundColor: (props) => props.theme?.color || "#6e00c8",
    width: 60,
    height: 60,
    cursor: 'pointer',
  },
  shapeCircle: {
    borderRadius: '50%',
    position: 'relative',
    transition: '.3s ease-in-out',
  },
  icon: {
    color: "#fff",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  hiddenItem: {
    display: 'none'
  },
  badge: {

  },
  hidden: {
    opacity: '0',
  },
  hiddenContent: {
    height: 0,
  },
  open: {
    opacity: '1',
    width: '250px',
    height: '400px',
    padding: '1em'
  },
  close: {
    height: '0',
    opacity: '0',
    width: '0'
  },
  menu: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 3px rgba(0,0,0,.2)',
    transition: 'opacity .3s ease-in-out',
    overflowY: 'auto'
  },
  iconBtn: {
    padding: '.8em',
    backgroundColor: (props) => props.theme.color,
    '&:hover': {
      backgroundColor: (props) => props.theme.hovered
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 0 0 1.3em'
  },
  divider: {
    margin: '1em 0'
  },
  notif: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '.5em'
  },
  groupButton: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    margin: '0 .3em'
  },
  accept: {
    backgroundcolor: (props) => props.theme.color,
    '&:hover': {
      backgroundcolor: (props) => props.theme.hovered,
    }
  },
  decline: {

  }
}));

export default () => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const { list } = useSelector((GlobalState) => GlobalState.notifs);
  const classes = useStyles({ theme: mytheme });
  const [open, setOpen] = useState(false);
  const [openIcon, setOpenIcon] = useState(false);

  const handleClick = () => {
    if (!open) {
      setOpenIcon(true);
      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
    else {
      setOpen(false);
      setTimeout(() => {
        setOpenIcon(false);
      }, 300);
    }
  };

  const circle = <Tooltip title={`Vous avez ${list.length} notification${list.length > 1 ? "s" : ""}`}>
    <div onClick={handleClick} className={cx(classes.shape, classes.shapeCircle, { [classes.openShape]: openIcon, [classes.closeShape]: !openIcon })}>
      <NotificationsIcon fontSize="large" className={classes.icon} />
    </div>
  </Tooltip>;


  return (
    <div className={classes.root}>
      <Badge className={cx({ [classes.hiddenItem]: open })} color="secondary" overlap="circle" badgeContent={list.length}>
        {circle}
      </Badge>
      <div className={cx(classes.menu, { [classes.open]: open, [classes.close]: !open })}>
        <div className={classes.header}>
          <IconButton onClick={handleClick} className={classes.iconBtn}>
            <CloseIcon className={classes.icon} />
          </IconButton>
          <Typography className={classes.title}> Notifications </Typography>
        </div>
        <Divider className={classes.divider} variant="middle" />
        {
            list && list.map((notif) => <Paper className={classes.notif}>
              <Typography component="p"> {notif.title} </Typography>
              <div className={classes.groupButton}>
                <Button variant="contained" className={cx(classes.buttons, classes.accept)}>
                  Accepter
                </Button>
                <Button variant="contained" color="secondary" className={cx(classes.buttons, classes.decline)}>
                  Refuser
                </Button>
              </div>
            </Paper>)
        }
        {
          list.length === 0 && <Typography align="center" component="p"> Aucune notification </Typography>
        }
      </div>
    </div>
  );
};
