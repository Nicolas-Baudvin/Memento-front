import React from "react";
import { Input } from 'semantic-ui-react';
import "./style.scss";

export default ({ state, setstate }) => (
  <>
    <label className="contact-right-form-label" htmlFor="email">Email</label>
    <Input
      value={state.email}
      onChange={(e) => setstate({ ...state, email: e.target.value })}
      className="contact-right-form-input"
      type="email"
      name="email"
      id="email"
      placeholder="example@example.fr"
      icon="at"
      size="big"
    />
  </>
);
