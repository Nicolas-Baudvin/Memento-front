import React from "react";
import { Button, Popup } from 'semantic-ui-react';
import { useHistory, useLocation } from "react-router-dom";

export default ({ state, setstate, tabs, resizeIcon }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleHelpBtn = () => {
    if (pathname === "/vos-tableaux/") {
      if (!tabs.length) {
        return setstate({ ...state, content: "Pour commencer, Cliquez sur créer un tableau, puis donnez lui le nom et l'image de fond que vous souhaitez. Ne vous en faites pas, vous pourrez les changer ensuite !", open: true });
      }
      return setstate({ ...state, content: "Vous avez créé votre tableau ? Parfait ! Maintenant cliquez dessus pour accéder à votre espace de travail !", open: true });
    }
    if (pathname === `/vos-tableaux/${pathname.substring(14)}`) {
      return setstate({ ...state, content: "Bienvenue dans votre espace de travail ! C'est ici que vous allez pouvoir créer vos listes, vos tâches et inviter vos amis. Pour commencer cliquez sur 'ajouter une liste' en haut de la page et écrivez ensuite le nom que vous voulez lui donner", open: true });
    }
  };

  return (
    <nav className="workmenu-header-nav">
      <Popup
        content={state.content}
        inverted
        on="hover"
        onClose={() => setstate({ ...state, open: false })}
        onOpen={handleHelpBtn}
        open={state.open}
        trigger={<Button icon="help circle" size={resizeIcon()} />}
      />
      <Popup
        trigger={<Button onClick={() => history.push("/vos-tableaux/")} icon="table" size={resizeIcon()} />}
        content="Vos tableaux"
      />
    </nav>
  );
};
