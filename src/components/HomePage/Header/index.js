import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

// Components
import Title from './Title';
import Nav from './Nav';
import Buttons from './Buttons';
import Menu from './Menu';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#6E00C8",
    fontSize: '1.5em',
    margin: '0 1em',
    '&:hover': {
      backgroundColor: 'rgba(120, 0, 200, 0.1)'
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '1em'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '.7em'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
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
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.5em'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '.8em'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
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
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.5em'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '.8em'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  menu: {
    display: 'none',
    color: '#6E00C8',
    fontSize: '1.5em',
    [theme.breakpoints.down('sm')]: {
      display: 'inline'
    }
  },
  close: {
    color: '#ff0000'
  },
  menuIcon: {
    fontSize: '3rem'
  }
}));

export default () => {
  const classes = useStyles();
  const { datas } = useSelector((state) => state.userData);
  const { pathname } = useLocation();
  return (
    <header className="homePage-header">
      <Title />
      <Nav classes={classes} />
      {
        pathname !== "/connexion/" && <Buttons classes={classes} datas={datas} />
      }
      <Menu pathname={pathname} classes={classes} datas={datas} />
    </header>
  );
};
