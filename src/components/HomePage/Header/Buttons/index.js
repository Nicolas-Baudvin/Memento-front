import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

// Actions
import { logOut } from '../../../../store/Registration/actions';

export default ({ classes, datas }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return <div className="homePage-header-buttons">
    {
      !datas && <>
        <Button onClick={() => history.push("/connexion/")} className={classes.outlined} variant="outlined">
          Connexion
        </Button>
        <Button onClick={() => history.push("/connexion/")} className={classes.contained} variant="contained" endIcon={<ArrowForwardIcon fontSize="large" />}>
          Essayer Gratuitement
        </Button>
      </>
    }
    {
      datas && <>
        <p>Bonjour, <span>{datas.username}</span></p>
        <Button onClick={() => history.push("/vos-tableaux/")} className={classes.contained} variant="contained" endIcon={<ArrowForwardIcon fontSize="large" />}>
          Vos tableaux
        </Button>
        <Button onClick={() => dispatch(logOut())} className={classes.outlined} variant="outlined" endIcon={<PowerSettingsNewIcon fontSize="large" />}>
          Déconnexion
        </Button>
      </>
    }
  </div>;
};
