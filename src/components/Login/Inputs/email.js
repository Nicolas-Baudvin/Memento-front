import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ state, setstate }) => (
    <label htmlFor="email" className="form-label"> Email
      <Input
        value={state.email}
        onChange={(e) => setstate({ ...state, email: e.target.value })}
        name="email"
        type="email"
        id="email"
        className="form-input"
        placeholder="example@example.com"
        icon="at"
      />
    </label>
);
