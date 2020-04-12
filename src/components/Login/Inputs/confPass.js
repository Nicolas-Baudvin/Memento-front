import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ setstate, state }) => {
  return (
    <>
      <label htmlFor="confirmPass" className="form-label">Confirmez le mot de passe</label>
      <Input
        value={state.confPass}
        onChange={(e) => setstate({ ...state, confPass: e.target.value })}
        className="form-input"
        type="password"
        name="confirmPass"
        placeholder="On a dis secret !"
        icon="key"
      />
    </>
  );
};
