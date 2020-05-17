import React, { useState, useCallback } from 'react';

const useSearch = () => {
  const [value, setSearch] = useState('');

  const setCurrentSearch = useCallback((currentSearch) => {
    setSearch(currentSearch);
  }, []);

  return {
    value,
    setCurrentSearch
  };
};

export default useSearch;
