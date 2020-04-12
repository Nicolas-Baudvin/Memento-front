import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ setstate, state }) => {
  return (
    <>
      <label htmlFor="username" className="form-label"> Pseudonyme </label>
      <Input
        value={state.username}
        onChange={(e) => setstate({ ...state, username: e.target.value })}
        className="form-input"
        type="text"
        name="username"
        placeholder="Votre Pseudonyme"
        icon="user"
      />
    </>
  );
};
