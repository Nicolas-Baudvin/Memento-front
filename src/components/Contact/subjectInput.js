import React from "react";
import { Input } from 'semantic-ui-react';
import "./style.scss";

export default ({ setstate, state }) => (
  <>
    <label className="contact-right-form-label" htmlFor="Sujet">Sujet</label>
    <Input
      value={state.subject}
      onChange={(e) => setstate({ ...state, subject: e.target.value })}
      className="contact-right-form-input"
      type="text"
      name="sujet"
      id="sujet"
      placeholder="Bug, Suggestions, Question..."
      size="big"
      icon="question circle"
    />
  </>
);
