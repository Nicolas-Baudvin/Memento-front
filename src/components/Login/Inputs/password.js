import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ setstate, state }) => {
  return (
    <>
      <label htmlFor="password" className="form-label"> Mot de passe </label>
      <Input
        value={state.password}
        onChange={(e) => setstate({ ...state, password: e.target.value })}
        type="password" name="password"
        className="form-input"
        placeholder="Ne le dis à personne"
        icon="key"
      />
    </>
  );
};
