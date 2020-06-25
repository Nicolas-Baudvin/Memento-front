import React from "react";
import { Typography } from "@material-ui/core";

import Menu from '../Menu';
import EditUsername from '../Views/changeUsername';
import EditPassword from '../Views/changePassword';
import EditEmail from '../Views/changeEmail';
import DeleteAccount from '../Views/deleteAccount';


export default ({
  state, setstate, settingsNav, classes, closeConfirm
}) => (
  <div className="modal-content">
    <div className="settings">

      <Menu state={state} setstate={setstate} settingsNav={settingsNav} />
      <div className="settings-body">
        <Typography className={classes.dynamicTitle}>{state.currentMenu}</Typography>
        {
            state.currentMenu === "Mon Compte" && <EditUsername state={state} setstate={setstate} />
          }
        {
            state.currentMenu === "Changer de mot de passe" && <EditPassword state={state} setstate={setstate} />
          }
        {
            state.currentMenu === "Changer d'email" && <EditEmail state={state} setstate={setstate} />
          }
        {
            state.currentMenu === "Supprimer mon compte" && <DeleteAccount state={state} setstate={setstate} closeConfirm={closeConfirm} />
          }
      </div>
    </div>
  </div>
);
