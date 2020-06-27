import React, { useState } from "react";
import {
  Select, makeStyles, FormControl, MenuItem, InputLabel, Input
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { updateTheme } from "../../../../store/Registration/actions";

const themes = [
  { color: "#1ac8ed", title: "Cyan", hovered: "#13bce1" },
  { color: "#f03a47", title: "Rouge", hovered: "#cb242f" },
  { color: "#6e00c8", title: "Violet", hovered: "#5d00a9" }, // base color
  { color: "#002d67", title: "Bleu foncé", hovered: "#002659" },
  { color: "#71c800", title: "Vert", hovered: "#5FA800" }
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
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'

    }
  }
}));

export default () => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [value, setValue] = useState(mytheme || "#6e00c8");

  const handleChangeTheme = (e) => {
    const color = themes.filter((item) => item.color === e.target.value)[0];
    setValue(color);
    dispatch(updateTheme(color));
  };

  return (
    <div className="settings-body-data">
      <FormControl>
        <InputLabel id="theme-label">Choissisez un thème</InputLabel>
        <Select
          labelId="theme-label"
          id="theme"
          value={value.color}
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
