import React, { useState } from "react";
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useDispatch } from "react-redux";

// Actions
import { updatePassword } from "../../../store/Registration/actions";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '1em .5em'
  },
  submit: {
    width: '150px',
    marginTop: '2em',
    alignSelf: 'center'
  }
}));

export default ({ state, setstate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorNew, setErrorNew] = useState(false);
  const [errorConf, setErrorConf] = useState(false);


  const handleSubmitChangePass = () => {
    const { oldPass, newPass, newPassConf } = state;

    if (!oldPass || !newPass || !newPassConf) {
      setError("Le champs est obligatoire");
      setErrorConf("Le champs est obligatoire");
      setErrorNew("Le champs est obligatoire");
      return;
    }
    if (newPass.length < 6 || newPass.length > 30) {
      setErrorNew("Le mot de passe doit faire entre 6 et 30 caractères");
      return;
    }
    if (oldPass.length < 6 || oldPass.length > 30) {
      setError("Le mot de passe doit faire entre 6 et 30 caractères");
      return;
    }
    if (newPassConf.length < 6 || newPassConf.length > 30) {
      setErrorConf("Le mot de passe doit faire entre 6 et 30 caractères");
      return;
    }
    if (newPass !== newPassConf) {
      setErrorConf("Les mots de passe doivent être identiques");
      setErrorNew("Les mots de passe doivent être identiques");
      return;
    }
    dispatch(updatePassword({ oldPass, newPass, newPassConf }));
  };

  return (
    <div className="settings-body-data">
      <TextField
        label="Ancien mot de passe"
        type="password"
        value={state.oldPass}
        onChange={(e) => setstate({ ...state, oldPass: e.target.value })}
        variant="outlined"
        className={classes.input}
        error={Boolean(error)}
        helperText={error}
      />
      <TextField
        label="Nouveau mot de passe"
        type="password"
        value={state.newPass}
        onChange={(e) => setstate({ ...state, newPass: e.target.value })}
        variant="outlined"
        className={classes.input}
        error={Boolean(errorNew)}
        helperText={errorNew}
      />

      <TextField
        label="Confirmez votre nouveau mot de passe"
        type="password"
        value={state.newPassConf}
        onChange={(e) => setstate({ ...state, newPassConf: e.target.value })}
        variant="outlined"
        className={classes.input}
        error={Boolean(errorConf)}
        helperText={errorConf}
      />

      <Button
        onClick={handleSubmitChangePass}
        className="settings-body-data-submit"
        variant="contained"
        color="primary"
      >
        Confirmer
      </Button>
    </div>
  );
};
