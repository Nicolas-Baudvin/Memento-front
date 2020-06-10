import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ setstate, state }) => (
    <label htmlFor="confirmPass" className="form-label">Confirmez le mot de passe
      <Input
        value={state.confPass}
        onChange={(e) => setstate({ ...state, confPass: e.target.value })}
        className="form-input"
        type="password"
        name="confirmPass"
        id="confirmPass"
        placeholder="Confirmez votre mot de passe"
        icon="key"
      />
    </label>
);
