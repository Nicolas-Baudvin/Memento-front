import React from 'react';
import { RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { changeCurrentRole } from '../../../../../store/Socket/actions';

const useStyles = makeStyles(() => ({
  radiogroup: {
    flexDirection: 'row',
    margin: '0 0 0 1em'
  }
}));

export default ({ guest, currentSocket, isOp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ChangeCurrentRole = () => dispatch(changeCurrentRole(guest, !isOp));
  return (
    <RadioGroup className={classes.radiogroup} aria-label="user rights">
      <FormControlLabel control={<Radio />} label="Invité" name="radio" value="guest" checked={!isOp} onChange={ChangeCurrentRole} />
      <FormControlLabel control={<Radio />} label="Opérateur" name="radio" value="operator" checked={isOp} onChange={ChangeCurrentRole} />
    </RadioGroup>
  );
};
