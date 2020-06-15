import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardMedia, makeStyles, Avatar, Tooltip } from '@material-ui/core';

// Actions
import { myFavs, myFavstabs } from '../../../../store/Favs/actions';

// Utils
import loadPic from '../../../../Utils/loadPic';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '250px',
    height: '200px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  avatar: {
    backgroundColor: '#6e00c8',
  },
  root: {
    margin: '0 1em',
    '&:hover': {
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
    }
  },
  header: {
    cursor: 'unset'
  }
}));

export default ({ openThisTab }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setstate] = useState({});
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
      openThisTab(favClicked.tabId);
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
        favsTabs && favsTabs.map((tab) => <Card className={classes.root} key={tab._id}>
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
            <CardMedia
              onClick={handleClickOpenTab(tab)}
              className={classes.image}
              image={tab.imgPath}
            />
          </Tooltip>
        </Card>)
      }
      {
        !favsTabs && <p>Vous n'avez pour le moment aucun tableau dans vos favoris</p>
      }
    </div>
  </>;
};
