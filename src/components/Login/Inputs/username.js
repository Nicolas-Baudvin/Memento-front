import React from "react";
import { TextField, InputAdornment } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

export default ({ setstate, state }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 30) {
      return setstate({ ...state, usernameError: "30 caractères maximum" });
    }
    if (!e.target.value.length) {
      return setstate({ ...state, usernameError: "Le champs est obligatoire", username: e.target.value });
    }
    return setstate({ ...state, username: e.target.value, usernameError: '' });
  };


  return (
    <TextField
      label="Pseudonyme"
      variant="outlined"
      value={state.username}
      onChange={handleChange}
      className="form-input"
      type="text"
      name="username"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <PersonIcon color="primary" />
          </InputAdornment>
        )
      }}
      error={state.usernameError.length > 0}
      helperText={state.usernameError ? state.usernameError : ' '}
      FormHelperTextProps={{
        error: state.usernameError.length > 0,
        variant: 'standard',
      }}
    />
  );
};
