import React from "react";
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";

// Icons
import TableChartIcon from '@material-ui/icons/TableChart';
import HomeIcon from '@material-ui/icons/Home';

// Components
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff"
  }
}));

export default ({
  isPublic
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <nav className="workmenu-header-nav">
      {
        window.screen.width < 767 && <Menu />
      }
      {
        window.screen.width > 767 && <>
          <Button className={classes.root} variant="text" startIcon={<HomeIcon />} onClick={() => history.push("/")} icon="home">
            Accueil
          </Button>

          {
            !isPublic && <Button className={classes.root} variant="text" onClick={() => history.push("/vos-tableaux/")} startIcon={<TableChartIcon />}>
              Tableaux
            </Button>
          }
        </>
      }
    </nav>
  );
};
