import React, { useState } from "react";
import {
  Select, makeStyles, FormControl, MenuItem, InputLabel, Input
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { updateTheme } from "../../../../store/Registration/actions";

const themes = [
  { color: "#1ac8ed", title: "Cyan" },
  { color: "#f03a47", title: "Rouge" },
  { color: "#6e00c8", title: "Violet" }, // base color
  { color: "#002d67", title: "Bleu foncé" },
  { color: "#71c800", title: "Vert" }
];

const useStyles = makeStyles(() => ({
  '#1ac8ed': {
    color: '#1ac8ed'
  },
  '#f03a47': {
    color: '#f03a47'
  },
  '#6e00c8': {
    color: '#6e00c8',
  },
  "#002d67": {
    color: '#002d67'
  },
  '#71c800': {
    color: '#71c800',
  },
  item: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#aaa'
    }
  },
  input: {
    display: 'flex',
    alignItems: 'center',
  }
}));

export default () => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [value, setValue] = useState(mytheme || "#6e00c8");

  const handleChangeTheme = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    dispatch(updateTheme(e.target.value));
  };

  return (
    <div className="settings-body-data">
      <FormControl>
        <InputLabel id="theme-label">Choissisez un thème</InputLabel>
        <Select
          labelId="theme-label"
          id="theme"
          value={value}
          onChange={handleChangeTheme}
          className={classes.input}
        >
          {themes.map((item) => <MenuItem value={item.color} className={classes.item} key={item.color}>
            <FiberManualRecordIcon className={classes[item.color]} />
            {item.title}
          </MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
};
