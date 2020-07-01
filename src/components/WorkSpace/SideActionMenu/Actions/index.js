import React, { useEffect } from "react";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import cx from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SmsIcon from '@material-ui/icons/Sms';
import TableChartIcon from '@material-ui/icons/TableChart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import StarIcon from '@material-ui/icons/Star';
import PublicIcon from '@material-ui/icons/Public';
import EmailIcon from '@material-ui/icons/Email';

// Actions
import { addFav, deleteFav, myFavs } from "../../../../store/Favs/actions";
import { changeTabStatus } from '../../../../store/Tabs/actions';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#fff',
    transition: '.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
  },
  basicButton: {
    '&:hover': {
      color: '#FCFF50'
    }
  },
  favStar: {
    color: '#FCFF50'
  }
}));


const Actions = ({ state, setstate, isInvited }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentTab } = useSelector((GlobalState) => GlobalState.mytabs);
  const { favs } = useSelector((GlobalState) => GlobalState.myfavs);
  const { mytheme } = useSelector(((GlobalState) => GlobalState.userData.datas));


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
      <nav style={{ backgroundColor: mytheme.color || "#6e00c8" }} className="sideActionMenu-nav">
        <Tooltip title="Ouvrir/Fermer le menu">
          <IconButton className={classes.button} onClick={handleClickOpenMenu}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        {
          state.menuIsOpen && <>
            {
              state.view !== "last-actions"
              && <Tooltip title="Retour menu principal">
                <IconButton onClick={handleClickChangeView('last-actions')} className={classes.button}>
                  <ArrowBackIcon fontSize="large" className={classes.icon} />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="Discussion instantanée">
              <IconButton onClick={handleClickChangeView('chat')} className={classes.button}>
                <SmsIcon fontSize="large" className={classes.icon} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Informations du tableau">
              <IconButton onClick={handleClickChangeView('tabInfo')} className={classes.button}>
                <TableChartIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            {
              !isInvited
              && <Tooltip title="Droits des invités">
                <IconButton onClick={handleClickChangeView("rights")} className={classes.button}>
                  <SupervisorAccountIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            }
            {
              !isInvited
              && <Tooltip title="Inviter un ami">
                <IconButton onClick={handleClickChangeView("invitation")} className={classes.button}>
                  <EmailIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            }
            {
              !isInvited
              && <Tooltip title="Rendre le tableau publique">
                <IconButton onClick={makeTabPublic} className={cx(classes.button, classes.basicButton, { [classes.favStar]: currentTab.isPublic })}>
                  <PublicIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title={isFav() ? "Supprimer des favoris" : "Ajouter au favoris"}>
              <IconButton
                onClick={() => (isFav() ? handleClickDeleteFav() : handleClickAddToFav())}
                className={cx(classes.button, classes.basicButton, { [classes.favStar]: isFav() })}
              >
                <StarIcon fontSize="large" />
              </IconButton>
            </Tooltip>
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
