import React from "react";
import { Input } from 'semantic-ui-react';

export default ({ state, setstate }) => {
  return (
    <>
      <label htmlFor="email" className="form-label"> Email </label>
      <Input
        value={state.email}
        onChange={(e) => setstate({ ...state, email: e.target.value })}
        name="email"
        type="email"
        className="form-input"
        placeholder="example@example.com"
        icon="at"
      />
    </>
  );
};
