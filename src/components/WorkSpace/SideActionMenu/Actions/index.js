import React from "react";
import { Popup, Button } from "semantic-ui-react";
import cx from 'classnames';

export default ({ state, setstate, isInvited }) => {
  const handleClickChangeView = (viewName) => (e) => {
    setstate({ ...state, view: viewName });
  };

  const handleClickOpenMenu = () => {
    setstate({ ...state, menuIsOpen: !state.menuIsOpen });
  };

  return (
    <>
      <nav className="sideActionMenu-nav">
        <div onClick={handleClickOpenMenu} className={cx("sideActionMenu-nav-open", { open: state.menuIsOpen })}>
          <div />
        </div>
        {
          state.menuIsOpen && <>
            {
              state.view !== "last-actions" && <Popup
                trigger={<Button onClick={handleClickChangeView('last-actions')} className="sideActionMenu-nav-btn" size="huge" icon="arrow alternate circle left" />}
                content="Retour au menu principal"
              />
            }
            <Popup
              trigger={<Button onClick={handleClickChangeView('chat')} size="huge" icon="wechat" color="vk" />}
              content="Accéder au chat"
            />
            <Popup
              trigger={<Button onClick={handleClickChangeView('tabInfo')} size="huge" icon="table" color="linkedin" />}
              content="À propos de ce tableau"
            />
            {
              !isInvited && <Popup
                trigger={<Button icon="trash alternate" size="huge" color="red" />}
                content="Supprimer le tableau"
              />
            }
          </>
        }
      </nav>
    </>
  );
};
