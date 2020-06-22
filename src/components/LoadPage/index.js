import React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.scss';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default ({ active, title }) => {
  const classes = useStyles();
  return (<div className="loadPage">
    <Backdrop title="Chargement..." className={classes.backdrop} open={active}>
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>);
};
