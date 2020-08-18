import React from 'react';
import { Backdrop, makeStyles, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.scss';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    backgroundColor: (props) => props.theme.color,
    marginTop: '3em',
    color: '#FFF',
    '&:hover': {
      backgroundColor: (props) => props.theme.hovered
    }
  }
}));

export default ({ active }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  return (<div className="loadPage">
    <Backdrop title="Chargement..." className={classes.backdrop} open={active}>
      <CircularProgress color="inherit" />
      <Button className={classes.button} variant="contained">
        Retour à l'accueil
      </Button>
    </Backdrop>
  </div>);
};
