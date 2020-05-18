import React from "react";
import { Popup, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cx from 'classnames';
// components
import Settings from '../../Settings';

// Actions
import { logOut } from '../../../../store/Registration/actions';

export default ({ state, setstate, isInvited }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickChangeView = (viewName) => (e) => {
    setstate({ ...state, view: viewName });
  };

  const handleClickDisconnect = () => dispatch(logOut());

  const handleClose = () => setstate({ ...state, isOpen: false });

  const handleOpen = () => setstate({ ...state, isOpen: true });

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
            <Popup
              trigger={<Button onClick={() => history.push("/mentions-légales/")} icon="legal" size="huge" />}
              content="Mentions légales"
            />
            <Popup
              trigger={<Button onClick={() => history.push("/contact/")} icon="phone" size="huge" />}
              content="Contact"
            />
            <Popup
              trigger={<Button onClick={() => history.push("/a-propos/")} icon="question circle" size="huge" />}
              content="À propos"
            />
            <Settings isOpen={state.isOpen} handleClose={handleClose} handleOpen={handleOpen} />
            <Popup
              trigger={<Button onClick={handleClickDisconnect} icon="power off" size="huge" />}
              content="Déconnexion"
            />
          </>
        }
      </nav>
    </>
  );
};
