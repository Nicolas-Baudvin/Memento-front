import React from "react";
import { Button, Input } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { updateEmail } from "../../../store/Registration/actions";

export default ({ state, setstate }) => {
  const dispatch = useDispatch();

  return (
    <div className="settings-body-data">
      <label className="settings-body-data-label" htmlFor="oldpass">Votre ancien email</label>
      <Input
        type="email"
        icon="at"
        placeholder="On ressort le vieux une dernière fois ..."
        className="settings-body-data-input"
        value={state.oldEmail}
        onChange={(e) => setstate({ ...state, oldEmail: e.target.value })}
      />

      <label className="settings-body-data-label" htmlFor="oldpass">Votre nouvel email</label>
      <Input
        type="email"
        icon="at"
        placeholder="On ressort le vieux une dernière fois ..."
        className="settings-body-data-input"
        value={state.newEmail}
        onChange={(e) => setstate({ ...state, newEmail: e.target.value })}
      />

      <Button
        onClick={() => dispatch(updateEmail({ newEmail: state.newEmail, oldEmail: state.oldEmail }))}
        className="settings-body-data-submit"
        content="Confirmer"
        color="green"
        icon="checkmark"
      />
    </div>
);
};
