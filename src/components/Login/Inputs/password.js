import React from "react";
import { TextField, InputAdornment } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

export default ({ setstate, state }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 30) {
      return setstate({ ...state, passError: "30 caractères maximum" });
    }
    if (!e.target.value.length) {
      return setstate({ ...state, passError: "Le champs est obligatoire", password: e.target.value });
    }
    return setstate({ ...state, password: e.target.value, passError: '' });
  };
  return (
    <TextField
      variant="outlined"
      label="Mot de passe"
      value={state.password}
      onChange={handleChange}
      type="password"
      name="password"
      id="password"
      className="form-input"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <LockIcon color="primary" />
          </InputAdornment>
        )
      }}
      helperText={state.passError ? state.passError : ' '}
      error={state.passError.length > 0}
      FormHelperTextProps={{
        error: state.passError.length > 0,
        variant: 'standard',
      }}
    />
  );
};
