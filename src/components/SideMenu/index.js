import React, { useState } from "react";
import { Icon } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";

// Actions
import { logOut } from "src/store/Registration/actions";

// Component
import Settings from 'src/components/Settings';

export default ({ handleOpen }) => {
  const initialState = {
    open: false,
  };
  const [state, setstate] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const openSettings = () => {
    setstate({ ...state, open: true });
  };

  const closeSettings = () => {
    setstate({ ...state, open: false });
  };

  return (
    <div className="header-sidemenu">
      <h2 className="header-sidemenu-mainTitle">Menu</h2>
      <div className="header-sidemenu-tabMenu">
        <div className="header-sidemenu-title"> <Icon name="table" /> Tableau</div>
        <ul>
          <li onClick={handleOpen}>Nouveau</li>
          <Settings isOpen={state.open} handleOpen={openSettings} handleClose={closeSettings} />
        </ul>
      </div>
      <div className="header-sidemenu-tabMenu">
        <div className="header-sidemenu-title"> <Icon name="plus" /> Autre</div>
        <ul>
          <li onClick={() => history.push("/contact/")}>Contact</li>
          <li onClick={() => history.push("/a-propos/")}>à propos</li>
          <li onClick={() => history.push("/mentions-legales/")}>Mentions Légales</li>
        </ul>
      </div>
      <div className="header-sidemenu-tabMenu">
        <div onClick={() => dispatch(logOut())} className="header-sidemenu-title"> <Icon name="log out" /> Déconnexion</div>
      </div>
    </div>
  );
};
