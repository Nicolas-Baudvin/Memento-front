import React from "react";
import { Icon } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import "./style.scss";
import { useHistory } from "react-router-dom";

export default ({ handleOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="header-sidemenu">
      <h2 className="header-sidemenu-mainTitle">Menu</h2>
      <div className="header-sidemenu-tabMenu">
        <div className="header-sidemenu-title"> <Icon name="table" /> Tableau</div>
        <ul>
          <li onClick={handleOpen}>Nouveau</li>
          <li>Options</li>
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
        <div className="header-sidemenu-title"> <Icon name="log out" /> Disconnect</div>
      </div>
    </div>
  );
};
