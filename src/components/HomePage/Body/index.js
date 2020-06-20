import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(() => ({
  button: {
    margin: '1em 0',
    backgroundColor: '#6E00C8',
    color: '#fff',
    fontSize: '2.5em',
    fontWeight: '300',
    '&:hover': {
      backgroundColor: 'rgba(120, 0, 200, 1)'
    }
  },
  icon: {
    fontSize: '2em'
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <div className="homePage-body">
      <div className="homePage-body-block">
        <div className="homePage-body-block-title">
          <h1><strong>Soyez Agile !</strong></h1>
          <h2><strong>My Memento</strong> vous aide dans votre organisation quotidienne ou professionnelle.</h2>
          <Button endIcon={<ArrowForwardIcon className={classes.icon} />} className={classes.button} variant="contained">
            C'est Parti !
          </Button>
        </div>
      </div>
      <div className="homePage-body-block">
        <img src="/assets/listes.png" alt="exemple de liste" />
        <div className="homePage-body-svg">
          <svg viewBox="0 0 100 100" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <circle fill="#6E00C8" cx="85" cy="70" r="50" />
          </svg>
        </div>
      </div>

    </div>
  );
};
