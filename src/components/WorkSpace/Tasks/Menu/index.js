import React, { useState } from "react";
import {
  Menu, MenuItem, IconButton, Divider, makeStyles, Paper, TextField, Button
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// Actions
import {
  updateTaskLabel, deleteTask, taskAssigned, updateTaskName
} from "../../../../store/Tasks/actions";

const useStyles = makeStyles(() => ({
  strong: {
    color: '#db2828'
  },
  weak: {
    color: '#21ba45'
  },
  middle: {
    color: '#2185d0'
  },
  button: {
    color: (props) => (props.theme ? props.theme.color : "#6e00c8")
  },
  menuHeader: {
    fontSize: '1.1em',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'unset',
    width: 'max-content',
    '&:hover': {
      backgroundColor: '#fff'
    }
  },
  delete: {
    color: '#ff0000'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '.4em',
  },
  submit: {
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
    color: '#fff',
    margin: '1em',
    '&:hover': {
      backgroundColor: (props) => (props.theme ? props.theme.hovered : "#6e00c8")
    }
  }
}));

const TaskMenu = ({ task, list, isInvited, isOp }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  const dispatch = useDispatch();
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const initialState = { [task._id]: task.title };
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setstate] = useState(initialState);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLabel = (label) => () => {
    dispatch(updateTaskLabel({ label, taskId: task._id, title: task.title }));
    handleClose();
  };

  const handleClickDelete = () => {
    dispatch(deleteTask(task._id, list.name));
    handleClose();
  };

  const handleClickTaskAssign = (username, selfAssign) => (e) => {
    if (selfAssign) {
      handleClose();
      return dispatch(taskAssigned({
        taskId: task._id,
        listName: list.name,
        order: task.order
      }, selfAssign));
    }
    dispatch(taskAssigned({
      username,
      taskId: task._id,
      listName: list.name,
      order: task.order
    }));
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTaskName({ title: state[task._id], taskId: task._id, oldTitle: task.title }));
    handleClose();
  };

  return (
    <div>
      <IconButton className={classes.button} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        onKeyDown={(e) => e.stopPropagation()}
      >
        {

          (!isInvited || (isInvited && isOp)) && <div>
            <MenuItem className={classes.menuHeader}>Ajouter un label</MenuItem>
            <Divider variant="middle" />
            <MenuItem onKeyDown={(e) => e.stopPropagation()} autoFocus={false} onClick={handleClickLabel("red")}> <FiberManualRecordIcon className={classes.strong} /> Forte importance</MenuItem>
            <MenuItem onKeyDown={(e) => e.stopPropagation()} autoFocus={false} onClick={handleClickLabel("blue")}> <FiberManualRecordIcon className={classes.middle} /> Moyenne Importance</MenuItem>
            <MenuItem onKeyDown={(e) => e.stopPropagation()} autoFocus={false} onClick={handleClickLabel("green")}> <FiberManualRecordIcon className={classes.weak} /> Faible Importance</MenuItem>
            <Divider variant="middle" />
          </div>
        }
        <MenuItem className={classes.menuHeader}>Assignation de tâche</MenuItem>
        <Divider variant="middle" />
        <MenuItem onKeyDown={(e) => e.stopPropagation()} onClick={handleClickTaskAssign(null, true)}>S'assigner la tâche</MenuItem>
        {
          (!isInvited || (isInvited && isOp)) && Object.keys(currentSocket).length && currentSocket.guests.map((guest) => (
            <MenuItem onKeyDown={(e) => e.stopPropagation()} key={guest.userData.username} onClick={handleClickTaskAssign(guest.userData.username, false)}>
              {guest.userData.username}
            </MenuItem>))
        }
        {
          (!isInvited || (isInvited && isOp)) && Object.keys(currentSocket).length && currentSocket.operators.map((guest) => (
            <MenuItem onKeyDown={(e) => e.stopPropagation()} key={guest.userData.username} onClick={handleClickTaskAssign(guest.userData.username, false)}>
              {guest.userData.username}
            </MenuItem>))
        }
        {
          (!isInvited || (isInvited && isOp)) && <div>
            <Divider variant="middle" />
            <MenuItem className={classes.menuHeader}>Édition</MenuItem>
            <Divider variant="middle" />
            <MenuItem onKeyDown={(e) => e.stopPropagation()} className={classes.delete} onClick={handleClickDelete}>Supprimer la tâche</MenuItem>
            <MenuItem onKeyDown={(e) => e.stopPropagation()}>
              <Paper className={classes.paper} onSubmit={handleSubmit} component="form">
                <TextField
                  multiline
                  value={state[task._id] || ''}
                  focused
                  onChange={(e) => setstate({ ...state, [task._id]: e.target.value })}
                  label="Changer le nom"
                />
                <Button className={classes.submit} type="submit" variant="contained">
                  Changer
                </Button>
              </Paper>
            </MenuItem>
          </div>
        }
      </Menu>
    </div>
  );
};

TaskMenu.propTypes = {
  task: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  isInvited: PropTypes.bool.isRequired,
  isOp: PropTypes.bool.isRequired
};

export default TaskMenu;
