import React from "react";
import { Button, Input } from 'semantic-ui-react';

export default ({ state, setstate, handleSubmitChangePass }) => {
  return (
    <div className="settings-body-data">
      <label className="settings-body-data-label" htmlFor="oldpass">Votre ancien mot de passe</label>
      <Input
        type="password"
        icon="key"
        placeholder="Mot de passe actuel"
        className="settings-body-data-input"
        value={state.oldPass}
        onChange={(e) => setstate({ ...state, oldPass: e.target.value })}
      />
      <label className="settings-body-data-label" htmlFor="newpass">Votre nouveau mot de passe</label>
      <Input
        type="password"
        icon="lock"
        placeholder="6 caractères minimum"
        className="settings-body-data-input"
        value={state.newPass}
        onChange={(e) => setstate({ ...state, newPass: e.target.value })}
      />

      <label className="settings-body-data-label" htmlFor="newpassconf">Confirmez le mot de passe</label>
      <Input
        type="password"
        icon="lock"
        placeholder="Confirmez votre mot de passe"
        className="settings-body-data-input"
        value={state.newPassConf}
        onChange={(e) => setstate({ ...state, newPassConf: e.target.value })}
      />

      <Button
        icon="checkmark"
        onClick={handleSubmitChangePass}
        className="settings-body-data-submit"
        content="Confirmer"
        color="green"
      />
    </div>
  );
};
