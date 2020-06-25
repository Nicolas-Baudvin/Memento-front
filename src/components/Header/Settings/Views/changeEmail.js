import React, { useEffect, useState } from "react";
import { Button, TextField, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../../../store/Registration/actions";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '1em .5em'
  },
  submit: {
    margin: '1em'
  },
  title: {
    textAlign: 'center'
  }
}));

export default ({ state, setstate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { message } = useSelector((globalState) => globalState.popup);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (state.newEmail !== state.oldEmail && state.newEmail) {
      setLoading(true);
      setError(false);
      dispatch(updateEmail({ newEmail: state.newEmail, oldEmail: state.oldEmail }));
    }
    else if (!state.newEmail) {
      setError("L'email doit être valide");
    }
    else {
      setError("Les emails doivent être différents");
    }
  };

  useEffect(() => {
    if (message) {
      setLoading(false);
    }
  }, [message]);

  return (
    <div className="settings-body-data">
      <TextField
        label="Votre email actuel"
        type="email"
        className={classes.input}
        value={state.oldEmail}
        variant="outlined"
      />

      <TextField
        label="Votre nouvel email"
        type="email"
        className={classes.input}
        value={state.newEmail}
        onChange={(e) => setstate({ ...state, newEmail: e.target.value })}
        variant="outlined"
        error={Boolean(error)}
        helperText={error || ' '}
      />

      <Button
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        className={classes.submit}
      >
        {
          !loading ? "Confirmer" : "Envoie en cours..."
        }
        {
          loading && <img src="/assets/spinner43px.svg" alt="Chargement..." />
        }
      </Button>

      <Typography component="p" className={classes.title}>Un email de confirmation sera envoyé sur votre email actuel</Typography>
    </div>
  );
};
