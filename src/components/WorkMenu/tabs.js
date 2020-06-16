/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { Card, CardHeader, CardMedia, makeStyles, Avatar, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// components
import Confirm from './Confirm';

// Styles & Icons
import "./style.scss";

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

export default ({ openThisTab, tabs }) => {
  const classes = useStyles();
  const initialState = {
    open: false,
    pic: []
  };

  const [state, setstate] = useState(initialState);

  const handleClick = (tab) => () => setstate({ ...state, open: !state.open, selectedTab: tab });

  return (
    <div className="workmenu-tabs">
      {
        tabs.map((tab) => (
          <Card className={classes.root} key={tab._id}>
            <CardHeader
              title={tab.name}
              avatar={
                <Avatar className={classes.avatar}>
                  {tab.owner.substring(0, 1)}
                </Avatar>
              }
              subheader={tab.owner}
              action={
                <>
                  <Tooltip title="Supprimer le tableau">
                    <IconButton onClick={handleClick(tab)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  <Confirm
                    message="Vous êtes sur le point de supprimer le tableau et toutes les ressources qui y sont liées. En êtes vous sûr ?"
                    state={state}
                    setstate={setstate}
                    handleClose={handleClick}
                    handleOpen={handleClick}
                  />
                </>
              }
              className={classes.header}
            />
            <Tooltip title="Cliquez pour accéder à votre tableau">
              <CardMedia
                onClick={openThisTab(tab._id, tab.name)}
                className={classes.image}
                image={tab.imgPath}
              />
            </Tooltip>
          </Card>
        ))
      }
    </div>
  );
};
