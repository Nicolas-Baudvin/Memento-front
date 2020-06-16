import React, { useState } from "react";
import { TextField, Tooltip, IconButton, Menu, MenuItem, Paper, makeStyles, Divider } from '@material-ui/core';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

// Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';

// Actions
import { deleteList, updateList } from "../../../store/Lists/actions";

const useStyles = makeStyles(() => ({
  button: {
    color: '#fff',
    backgroundColor: '#6E00C8',
    '&:hover': {
      backgroundColor: '#6100B1',
    }
  },
  paper: {
    padding: '.4em',
    display: 'flex',
    flexDirection: 'row'
  },
  delete: {
    color: '#ff0000'
  }
}));

const ListHeader = ({ list }) => {
  const classes = useStyles();
  const initialState = {};

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
    <div className="list-header">
      <h2 className="list-header-title show"> {list.name} </h2>
      <Tooltip title="Paramètres de la liste...">
        <IconButton className={classes.button} onClick={handleClick}>
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
        <MenuItem onKeyDown={(e) => e.stopPropagation()}>
          <Paper className={classes.paper} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Changer le nom"
              onChange={handleChange(list._id)}
            />
            <Divider orientation="vertical" />
            <Tooltip title="Envoyer">
              <IconButton className={classes.button} color="primary" type="submit">
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </MenuItem>
        <MenuItem onKeyDown={(e) => e.stopPropagation()} className={classes.delete} onClick={deleteItem}>Supprimer la liste</MenuItem>
      </Menu>
    </div>
  );
};

ListHeader.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListHeader;
