import React, { useState, useEffect } from "react";
import { Button, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

// Icons
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';

// Utils
import loadPic from '../../Utils/loadPic';

// Actions
import { logOut } from "../../store/Registration/actions";

// Components
import Nav from './Nav';
import Title from './Title';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff"
  }
}));

export default ({ isPublic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const { datas } = useSelector((GlobalState) => GlobalState.userData);
  const { pathname } = useLocation();

  const resizeIcon = () => (window.screen.width <= 767 ? "tiny" : "huge");

  const initialState = {
    show: false,
    open: false,
    content: '',
    logo: '',
    isOpen: false
  };
  const [state, setstate] = useState(initialState);

  const getLogo = async (url) => {
    try {
      const pic = await loadPic(url);
      setstate({ ...state, logo: pic });
    }
    catch (e) {
      console.log(e);
    }
  };

  const handleClickDisconnect = () => dispatch(logOut());

  const handleClose = () => setstate({ ...state, isOpen: false });

  const handleOpen = () => setstate({ ...state, isOpen: true });

  useEffect(() => {
    getLogo("/assets/logo.png");
  }, []);

  return (
    <header className="workmenu-header" style={pathname === "/vos-tableaux/" || pathname === "/vos-tableaux" ? { backgroundColor: "#2D94CF" } : {}}>
      <Nav isPublic={isPublic} resizeIcon={resizeIcon} tabs={tabs} state={state} setstate={setstate} />
      <Title state={state} />
      {
        window.screen.width > 767 && <nav>
          {
            datas && !isPublic && <Settings
              isOpen={state.isOpen}
              handleClose={handleClose}
              handleOpen={handleOpen}
              resizeIcon={resizeIcon}
            />
          }
          {
            datas && <Button classes={classes} variant="text" startIcon={<PowerSettingsNewIcon />} onClick={handleClickDisconnect}>
              Déconnexion
            </Button>
          }
          {
            !datas && <Button classes={classes} variant="text" startIcon={<PersonIcon />}>
              Connexion/Inscription
            </Button>
          }
        </nav>
      }
    </header>
  );
};
