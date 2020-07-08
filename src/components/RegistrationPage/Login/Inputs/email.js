import React from "react";
import { TextField, InputAdornment } from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

export default ({ state, setstate }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 100) {
      return setstate({ ...state, emailError: "30 caractères maximum" });
    }
    if (!e.target.value.length) {
      return setstate({ ...state, emailError: "Le champs est obligatoire", email: e.target.value });
    }
    return setstate({ ...state, email: e.target.value, emailError: '' });
  };

  return (
    <TextField
      variant="outlined"
      value={state.email}
      onChange={handleChange}
      name="email"
      type="email"
      id="email"
      className="form-input"
      label="Email"
      size="medium"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <AlternateEmailIcon color="primary" />
          </InputAdornment>
        )
      }}
      error={state.emailError.length > 0}
      helperText={state.emailError ? state.emailError : ' '}
      FormHelperTextProps={{
        error: state.emailError.length > 0,
        variant: 'standard',
      }}
    />
  );
};
