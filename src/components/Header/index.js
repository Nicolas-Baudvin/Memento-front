import React, { useState } from "react";
import { Button, Popup } from 'semantic-ui-react';
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Menu from '../SideMenu';

export default ({ handleOpen }) => {
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const { pathname } = useLocation();
  const initialState = {
    show: false,
    open: false,
    content: ''
  };
  const [state, setstate] = useState(initialState);
  const history = useHistory();

  const handleHelpBtn = () => {
    if (pathname === "/vos-tableaux/") {
      if (!tabs.length) {
        return setstate({ ...state, content: "Pour commencer, Cliquez sur créer un tableau, puis donnez lui le nom et l'image de fond que vous souhaitez. Ne vous en faites pas, vous pourrez les changer ensuite !", open: true });
      }
      return setstate({ ...state, content: "Vous avez créer votre tableau ? Parfait ! Maintenant cliquez dessus pour accéder à votre espace de travail !", open: true });
    }
    if (pathname === `/vos-tableaux/${pathname.substring(14)}`) {
      return setstate({ ...state, content: "Bienvenue dans votre espace de travail ! C'est ici que vous allez pouvoir créer vos listes, vos tâches et inviter vos amis. Pour commencer cliquez sur 'ajouter une liste' en haut de la page et écrivez ensuite le nom que vous voulez lui donner", open: true });
    }
  };

  return (
    <header className="workmenu-header">
      <nav className="workmenu-header-nav">
        <Button onClick={() => history.push("/")} icon="home" />
        <Popup
          content={state.content}
          inverted
          on="click"
          onClose={() => setstate({ ...state, open: false })}
          onOpen={handleHelpBtn}
          open={state.open}
          trigger={<Button icon="help circle" />}
        />

        <Button onClick={() => history.push("/vos-tableaux/")} icon="table" />
      </nav>
      <h1 className="workmenu-header-title" onClick={() => history.push("/vos-tableaux/")}>Memento</h1>
      <Button onClick={() => setstate({ ...state, show: !state.show })} content="Menu" icon="bars" />
      {
        state.show && <Menu handleOpen={handleOpen} />
      }
    </header>
  );
};
