import React from "react";
import { TextField, InputAdornment } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

export default ({ setstate, state }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 30) {
      return setstate({ ...state, confPassError: "30 caractères maximum" });
    }
    if (!e.target.value.length) {
      return setstate({ ...state, confPassError: "Le champs est obligatoire", confPass: e.target.value });
    }
    return setstate({ ...state, confPass: e.target.value, confPassError: '' });
  };

  return (
    <TextField
      variant="outlined"
      label="Confirmation du mot de passe"
      value={state.confPass}
      onChange={handleChange}
      className="form-input"
      type="password"
      name="confirmPass"
      id="confirmPass"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <LockIcon color="primary" />
          </InputAdornment>
        )
      }}
      error={state.confPassError.length > 0}
      helperText={state.confPassError ? state.confPassError : ' '}
      FormHelperTextProps={{
        error: state.confPassError.length > 0,
        variant: 'standard',
      }}
    />
  );
};
