import React, { useEffect } from "react";
import { Popup, Button } from "semantic-ui-react";
import cx from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

// Actions
import { addFav, deleteFav, myFavs } from "../../../../store/Favs/actions";
import { makeMyTabPublic, makeMyTabPrivate, changeTabStatus } from '../../../../store/Tabs/actions';


const Actions = ({ state, setstate, isInvited }) => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((GlobalState) => GlobalState.mytabs);
  const { favs } = useSelector((GlobalState) => GlobalState.myfavs);

  const isFav = () => (favs ? favs.favTabs.filter((fav) => fav.tabId === currentTab._id).length > 0 : false);

  const handleClickChangeView = (viewName) => (e) => {
    setstate({ ...state, view: viewName });
  };

  const handleClickOpenMenu = () => {
    setstate({ ...state, menuIsOpen: !state.menuIsOpen });
  };

  const handleClickAddToFav = () => dispatch(addFav(currentTab._id, isInvited));

  const handleClickDeleteFav = () => dispatch(deleteFav(currentTab._id));

  const makeTabPublic = () => dispatch(changeTabStatus(!currentTab.isPublic, currentTab._id));

  useEffect(() => dispatch(myFavs()), []);

  return (
    <>
      <nav className="sideActionMenu-nav">
        <Button size="huge" className="first" icon="bars" onClick={handleClickOpenMenu} />
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
                trigger={<Button onClick={handleClickChangeView("rights")} icon="checkmark box" size="huge" />}
                content="Gérer les droits"
              />
            }
            {
              !isInvited && <Popup
                trigger={<Button onClick={makeTabPublic} size="huge" icon="world" color={currentTab.isPublic && "yellow"} />}
                content={!currentTab.isPublic ? "Rendre le tableau publique" : "Rendre le tableau privé"}
              />
            }
            <Popup
              trigger={
                <Button
                  icon="star"
                  size="huge"
                  onClick={() => (isFav() ? handleClickDeleteFav() : handleClickAddToFav())}
                  className={cx("", { yellow: isFav() })}
                />
              }
              content={isFav() ? "Supprimer des favoris" : "Ajouter aux favoris"}
            />
          </>
        }
      </nav>
    </>
  );
};

Actions.propTypes = {
  state: PropTypes.object.isRequired,
  setstate: PropTypes.func.isRequired,
  isInvited: PropTypes.bool.isRequired
};

export default Actions;
