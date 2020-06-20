import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  return <div onClick={() => history.push("/")} className="homePage-header-title">
    <img src="/assets/logo.png" alt="Logo du site" />
    <h1>My Memento</h1>
  </div>;
};
