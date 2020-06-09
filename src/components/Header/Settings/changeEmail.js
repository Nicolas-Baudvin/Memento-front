import React, { useEffect, useState } from "react";
import { Button, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../../store/Registration/actions";

export default ({ state, setstate }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((globalState) => globalState.popup);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (state.newEmail !== state.oldEmail) {
      dispatch(updateEmail({ newEmail: state.newEmail, oldEmail: state.oldEmail }));
    }
  };

  useEffect(() => {
    if (message) {
      setLoading(false);
    }
  }, [message]);

  return (
    <div className="settings-body-data">
      <label className="settings-body-data-label" htmlFor="oldpass">Votre ancien email</label>
      <Input
        type="email"
        icon="at"
        placeholder="Votre email actuel"
        className="settings-body-data-input"
        value={state.oldEmail}
        onChange={(e) => setstate({ ...state, oldEmail: e.target.value })}
      />

      <label className="settings-body-data-label" htmlFor="oldpass">Votre nouvel email</label>
      <Input
        type="email"
        icon="at"
        placeholder="Votre nouvel email"
        className="settings-body-data-input"
        value={state.newEmail}
        onChange={(e) => setstate({ ...state, newEmail: e.target.value })}
      />

      <Button
        onClick={handleSubmit}
        className="settings-body-data-submit"
        content="Confirmer"
        color="green"
        icon="checkmark"
        loading={loading}
      />

      <p>Un email de confirmation sera envoyé sur votre email actuel</p>
    </div>
);
};
