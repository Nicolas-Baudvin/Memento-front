import React, { useState } from 'react';
import {
  Menu, MenuItem, IconButton, Divider, makeStyles, Paper, TextField, Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// Actions
import { updateTaskLabel, taskAssigned, deleteTask, updateTaskName } from '../../../../../store/Tasks/actions';

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
    color: '#6E00C8'
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
    backgroundColor: '#6E00C8',
    color: '#fff',
    margin: '1em'
  }
}));

export default ({ task, isOp, list }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentSocket } = useSelector((GlobalState) => GlobalState.sockets);
  const { username: name } = useSelector((GlobalState) => GlobalState.userData.datas);
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setstate] = useState({});

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
      return dispatch(taskAssigned({
        taskId: task._id,
        listName: list.name,
        order: task.order
      }, selfAssign));
    }
    return dispatch(taskAssigned({
      username,
      taskId: task._id,
      listName: list.name,
      order: task.order
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTaskName({ title: state[task._id], taskId: task._id, oldTitle: task.title }));
    setstate({ ...state, [task._id]: '' });
  };

  return (<>
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
        isOp && <><MenuItem className={classes.menuHeader}>Ajouter un label</MenuItem>
          <Divider variant="middle" />
          <MenuItem onKeyDown={(e) => e.stopPropagation()} autoFocus={false} onClick={handleClickLabel("red")}> <FiberManualRecordIcon className={classes.strong} /> Forte importance</MenuItem>
          <MenuItem onKeyDown={(e) => e.stopPropagation()} autoFocus={false} onClick={handleClickLabel("blue")}> <FiberManualRecordIcon className={classes.middle} /> Moyenne Importance</MenuItem>
          <MenuItem onKeyDown={(e) => e.stopPropagation()} autoFocus={false} onClick={handleClickLabel("green")}> <FiberManualRecordIcon className={classes.weak} /> Faible Importance</MenuItem>
          <Divider variant="middle" />
        </>
      }
      <MenuItem className={classes.menuHeader}>Assignation de tâche</MenuItem>
      <Divider variant="middle" />
      <MenuItem onKeyDown={(e) => e.stopPropagation()} onClick={handleClickTaskAssign(null, true)}>S'assigner la tâche</MenuItem>
      {
        isOp && Object.keys(currentSocket).length && currentSocket.guests.map((guest) => (
          <MenuItem onKeyDown={(e) => e.stopPropagation()} key={guest.userData.username} onClick={handleClickTaskAssign(guest.userData.username, false)}>
            {guest.userData.username}
          </MenuItem>))
      }
      {
        isOp && Object.keys(currentSocket).length && currentSocket.operators.map((guest) => (
          <MenuItem onKeyDown={(e) => e.stopPropagation()} key={guest.userData.username} onClick={handleClickTaskAssign(guest.userData.username, false)}>
            {guest.userData.username}
          </MenuItem>))
      }
      {
        isOp && <>
          <Divider variant="middle" />
          <MenuItem className={classes.menuHeader}>Édition</MenuItem>
          <Divider variant="middle" />
          <MenuItem onKeyDown={(e) => e.stopPropagation()} className={classes.delete} onClick={handleClickDelete}>Supprimer la tâche</MenuItem>
          <MenuItem onKeyDown={(e) => e.stopPropagation()}>
            <Paper className={classes.paper} onSubmit={handleSubmit} component="form">
              <TextField value={state[task._id] || ''} focused onChange={(e) => setstate({ ...state, [task._id]: e.target.value })} label="Changer le nom" />
              <Button className={classes.submit} type="submit" variant="contained">
                Changer
              </Button>
            </Paper>
          </MenuItem>
        </>
      }
    </Menu>
    {/* <Dropdown item icon="cog" simple>
      <Dropdown.Menu>
        {
          isOp && <>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span>Ajouter un label...</span>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleClickLabel("red")}>
                  <Icon name="circle" color="red" />
                  <span>Importance forte</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleClickLabel("blue")}>
                  <Icon name="circle" color="blue" />
                  <span>Importance moyenne</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleClickLabel("green")}>
                  <Icon name="circle" color="green" />
                  <span>Importance Faible</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span>Assigner à ...</span>

              <Dropdown.Menu>
                {
                  currentSocket && currentSocket.guests.length === 0 && <Dropdown.Item>
                    Aucun invité
                  </Dropdown.Item>
                }
                {
                  currentSocket && currentSocket.guests.map((guest) => <Dropdown.Item key={guest.userData.username} onClick={handleClickTaskAssign(guest.userData.username, false)}>
                    {guest.userData.username}
                  </Dropdown.Item>)
                }
                {
                  currentSocket && currentSocket.operators.map((op) => op.userData.username !== name && <Dropdown.Item key={op.userData.username} onClick={handleClickTaskAssign(op.userData.username, false)}>
                    {op.userData.username}
                  </Dropdown.Item>)
                }
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleClickDelete}>Supprimer</Dropdown.Item>
          </>
        }
        <Dropdown.Item onClick={handleClickTaskAssign(null, true)}>
          S'assigner cette tâche
        </Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown> */}
  </>
  );
};
