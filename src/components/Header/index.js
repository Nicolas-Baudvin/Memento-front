import React, { useState, useEffect } from "react";
import { Button, Popup } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

// Utils
import loadPic from '../../Utils/loadPic';

// Actions
import { logOut } from "../../store/Registration/actions";

// Components
import Nav from './Nav';
import Title from './Title';
import Settings from './Settings';

export default ({ isPublic }) => {
  const history = useHistory();
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
      <nav>
        {
          datas && !isPublic && <Settings
            isOpen={state.isOpen}
            handleClose={handleClose}
            handleOpen={handleOpen}
            resizeIcon={resizeIcon}
          />
        }
        {
          isPublic && !datas && <Popup
            trigger={<Button onClick={() => history.push("/")} icon="home" size={resizeIcon()} />}
            content="Accueil"
            position="left center"
          />
        }
        {
          datas && <Popup
            trigger={<Button onClick={handleClickDisconnect} icon="power off" size={resizeIcon()} />}
            content="Déconnexion"
            position="left center"
          />
        }
      </nav>
    </header>
  );
};
