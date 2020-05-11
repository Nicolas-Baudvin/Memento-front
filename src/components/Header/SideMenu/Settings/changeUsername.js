import React from "react";
import { Button, Input } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { updateUsername } from "../../../../store/Registration/actions";

export default ({ state, setstate }) => {
  const dispatch = useDispatch();
  return (
    <div className="settings-body-data">
      <label className="settings-body-data-label" htmlFor="username">Votre pseudo</label>
      <div className="settings-body-data-group">

        <Input
          className="settings-body-data-input"
          value={state.username}
          disabled={state.usernameIsDisabled}
          onChange={(e) => setstate({ ...state, username: e.target.value })}
        />

        <Button
          className="settings-body-data-btn"
          onClick={() => setstate({ ...state, usernameIsDisabled: !state.usernameIsDisabled })}
          content="Changer"
          primary
        />

      </div>

      <Button
        icon="checkmark"
        onClick={() => dispatch(updateUsername(state.username))}
        className="settings-body-data-submit"
        content="Confirmer"
        color="green"
      />
    </div>
  );
};
