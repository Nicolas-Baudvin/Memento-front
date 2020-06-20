import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

// Components
import Title from './Title';
import Nav from './Nav';
import Buttons from './Buttons';

const useStyles = makeStyles(() => ({
  button: {
    color: "#6E00C8",
    fontSize: '1.5em',
    margin: '0 1em',
    '&:hover': {
      backgroundColor: 'rgba(120, 0, 200, 0.1)'
    }
  },
  outlined: {
    margin: '0 .5em',
    borderColor: "#6E00C8",
    color: '#6E00C8',
    fontSize: '2em',
    borderRadius: '10px',
    fontWeight: '500',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'rgba(120, 0, 200, .05)',
      borderColor: 'rgba(120, 0, 200)',
      boxShadow: '0 2px 2px rgba(0,0,0,.2)'
    }
  },
  contained: {
    backgroundColor: '#6E00C8',
    margin: '0 .5em',
    color: '#fff',
    fontSize: '2em',
    borderRadius: '10px',
    fontWeight: '300',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'rgba(120, 0, 200)'
    }
  }
}));

export default () => {
  const classes = useStyles();
  const { datas } = useSelector((state) => state.userData);

  return (
    <div className="homePage-header">
      <Title />
      <Nav classes={classes} />
      <Buttons classes={classes} datas={datas} />
    </div>
  );
};
