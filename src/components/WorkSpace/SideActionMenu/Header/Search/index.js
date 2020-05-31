import React, { useContext } from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import searchContext from '../../../List/searchContext';


const Search = ({ state }) => {
  const search = useContext(searchContext);

  const handleSearchChange = (e) => {
    search.setCurrentSearch(e.target.value);
  };

  return <Input
    loading={state.isLoading}
    onChange={handleSearchChange}
    icon="search"
    placeholder="Chercher une carte"
  />;
};

Search.propTypes = {
  state: PropTypes.object.isRequired,
};

export default Search;
