import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ setstate, state }) => (
    <label htmlFor="username" className="form-label"> Pseudonyme
      <Input
        value={state.username}
        onChange={(e) => setstate({ ...state, username: e.target.value })}
        className="form-input"
        type="text"
        name="username"
        placeholder="Votre Pseudonyme"
        icon="user"
      />
    </label>
);
