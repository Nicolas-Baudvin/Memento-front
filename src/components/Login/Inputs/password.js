import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ setstate, state }) => (
    <label htmlFor="password" className="form-label"> Mot de passe
      <Input
        value={state.password}
        onChange={(e) => setstate({ ...state, password: e.target.value })}
        type="password"
        name="password"
        id="password"
        className="form-input"
        placeholder="Votre mot de passe"
        icon="key"
      />
    </label>
);
