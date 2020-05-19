import React from 'react';
import { Input } from 'semantic-ui-react';

export default ({ state, handleSearchChange }) => {
  return <Input
    loading={state.isLoading}
    onChange={handleSearchChange}
    icon="search"
    placeholder="Chercher une carte"
  />;
};
