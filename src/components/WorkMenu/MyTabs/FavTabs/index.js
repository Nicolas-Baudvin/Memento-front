import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardMedia, makeStyles, Avatar, Tooltip } from '@material-ui/core';
import cx from 'classnames';

// Actions
import { myFavs, myFavstabs } from '../../../../store/Favs/actions';

// Utils
import loadPic from '../../../../Utils/loadPic';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '250px',
    height: '200px',
    cursor: 'pointer',
    border: 0
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  avatar: {
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8"),
  },
  root: {
    margin: '0 1em',
    '&:hover': {
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
    }
  },
  header: {
    cursor: 'unset'
  },
  focus: {
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
  }
}));

export default ({ openThisTab }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  const dispatch = useDispatch();
  const [state, setstate] = useState({});
  const [isFocus, setFocus] = useState({});
  const { favs, favsTabs } = useSelector((GlobalState) => GlobalState.myfavs);

  const getPic = () => {
    favsTabs.forEach(async (tab) => {
      const pic = await loadPic(tab.imgPath);
      setstate({ ...state, [tab._id]: pic });
    });
  };

  const handleClickOpenTab = (item) => (e) => {
    const favClicked = favs.favTabs.filter((elem) => elem.tabId === item._id)[0];
    if (favClicked.isInvited) {
      window.location.href = `https://mymemento.fr/join/${favClicked.tabId}/${favClicked.invitationLink}/`;
    }
    else {
      openThisTab(item._id, item.name)();
    }
  };
  useEffect(() => {
    dispatch(myFavs());
  }, []);

  useEffect(() => {
    if (favs) {
      dispatch(myFavstabs());
    }
  }, [favs]);

  useEffect(() => {
    if (favsTabs) getPic();
  }, [favsTabs]);

  return <>
    <h2 className="workmenu-body-tabs-title black">
      Tableaux favoris
    </h2>
    <div className="workmenu-tabs">
      {
        favsTabs && favsTabs.map((tab) => {
          return tab !== null && <Card className={cx(classes.root, { [classes.focus]: isFocus[tab._id] })} key={tab._id}>
            <CardHeader
              title={tab.name}
              avatar={
                <Avatar className={classes.avatar}>
                  {tab.owner.substring(0, 1)}
                </Avatar>
              }
              subheader={tab.owner}
              className={classes.header}
            />
            <Tooltip title="Cliquez pour accéder à votre tableau">
              <input
                type="image"
                onClick={handleClickOpenTab(tab)}
                className={classes.image}
                src={tab.imgPath}
                alt="background du tableau"
                onBlur={() => setFocus({ ...isFocus, [tab._id]: false })}
                onFocus={() => setFocus({ ...isFocus, [tab._id]: true })}
              />
            </Tooltip>
          </Card>;
        })
      }
      {
        !favsTabs && <p>Vous n'avez pour le moment aucun tableau dans vos favoris</p>
      }
    </div>
  </>;
};
