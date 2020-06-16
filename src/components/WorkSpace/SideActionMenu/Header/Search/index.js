import React, { useContext } from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import searchContext from '../../../List/searchContext';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '1em'
  }
}));

const Search = ({ state }) => {
  const classes = useStyles();
  const search = useContext(searchContext);

  const handleSearchChange = (e) => {
    search.setCurrentSearch(e.target.value);
  };

  return <TextField
    label="Rechercher une carte"
    onChange={handleSearchChange}
    variant="outlined"
    size="small"
    className={classes.input}
    InputProps={{
      endAdornment: (
        <InputAdornment>
          <SearchIcon />
        </InputAdornment>
      )
    }}
  />;
};

Search.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Search;
