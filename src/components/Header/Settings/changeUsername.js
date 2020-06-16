import React, { useState } from "react";
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { updateUsername } from "../../../store/Registration/actions";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: '1em'
  },
  submit: {
    width: '150px',
    marginTop: '2em',
    alignSelf: 'center'
  }
}));

export default ({ state, setstate }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    if (e.target.value.length < 3) {
      setError("Le pseudo doit faire entre 3 et 30 caractères");
    }
    else if (e.target.value.length > 20) {
      return setError("Le pseudo doit faire entre 3 et 30 caractères");
    }
    if (e.target.value.length > 3 && e.target.value.length <= 20) {
      setError("");
    }
    return setstate({ ...state, username: e.target.value });
  };

  return (
    <div className="settings-body-data">
      <div className="settings-body-data-group">
        <TextField
          label="Votre pseudo"
          variant="outlined"
          value={state.username}
          onChange={handleChange}
          error={Boolean(error)}
          helperText={error || ' '}
        />
      </div>

      <Button
        onClick={() => dispatch(updateUsername(state.username))}
        color="primary"
        className={classes.submit}
        variant="contained"
      >
        Changer
      </Button>
    </div>
  );
};
