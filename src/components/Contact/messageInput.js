import React from "react";
import { TextArea } from 'semantic-ui-react';
import "./style.scss";

export default ({ setstate, state }) => (
  <>
    <label className="contact-right-form-label" htmlFor="Text">Message</label>
    <TextArea
      value={state.message}
      onChange={(e) => setstate({ ...state, message: e.target.value })}
      className="contact-right-form-input"
      name="Text"
      id="Text"
      cols="30"
      rows="10"
      placeholder="Ecrivez votre message ici..."
    />
  </>
);
