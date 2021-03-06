import React, { useState } from "react";
import {
  TextField, Tooltip, IconButton, Menu, MenuItem, Paper, makeStyles, Divider, Button
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Actions
import { deleteList, updateList } from "../../../store/Lists/actions";

const useStyles = makeStyles(() => ({
  button: {
    color: '#fff',
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
    '&:hover': {
      backgroundColor: (props) => (props.theme ? props.theme.hovered : "#6e00c8"),
    }
  },
  submit: {
    color: '#fff',
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
    margin: '1em 0',
    '&:hover': {
      backgroundColor: (props) => (props.theme ? props.theme.hovered : "#6e00c8"),
    }
  },
  paper: {
    padding: '.4em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  delete: {
    color: '#ff0000'
  },
  inputItem: {
    cursor: 'unset',
    '&:hover': {
      backgroundColor: 'unset'
    }
  }
}));

const ListHeader = ({ list, isPublic, isInvited, isOp }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  const initialState = { [list._id]: list.name };
  const [state, setstate] = useState(initialState);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = state[list._id];
    if (value) dispatch(updateList({ newTitle: value, list }));
    handleClose();
  };

  const handleChange = (listId) => (e) => {
    setstate({ ...state, [listId]: e.target.value });
  };

  const deleteItem = () => {
    if (list._id) {
      dispatch(deleteList({ listID: list._id, name: list.name }));
    }
    handleClose();
  };

  return (
    <div style={{ backgroundColor: (mytheme ? mytheme.color : "#6e00c8") }} className="list-header">
      <h2 className="list-header-title show"> {list.name} </h2>
      {
        !isPublic && ((isInvited && isOp) || (!isInvited))
        && <>
          <Tooltip title="Paramètres de la liste...">
            <IconButton
              className={classes.button}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className={classes.inputItem} onKeyDown={(e) => e.stopPropagation()}>
              <Paper className={classes.paper} component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Changer le nom"
                  onChange={handleChange(list._id)}
                  value={state[list._id]}
                />
                <Divider orientation="vertical" />
                <Button className={classes.submit} color="primary" type="submit">
                  Envoyer
                </Button>
              </Paper>
            </MenuItem>
            <MenuItem onKeyDown={(e) => e.stopPropagation()} className={classes.delete} onClick={deleteItem}>Supprimer la liste</MenuItem>
          </Menu>
        </>
      }
    </div>
  );
};

ListHeader.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListHeader;
