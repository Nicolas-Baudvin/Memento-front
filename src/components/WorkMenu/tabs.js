/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardMedia, makeStyles, Avatar } from '@material-ui/core';

// components
import Confirm from './Confirm';

// Styles & Icons
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  image: {
    width: '250px',
    height: '200px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  avatar: {
    backgroundColor: '#6e00c8',
  },
  root: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 0 5px rgba(42, 191, 236, 0.5)'
    }
  },
  header: {
    cursor: 'unset'
  }
}));

export default ({ openThisTab }) => {
  const classes = useStyles();
  const { tabs } = useSelector((GlobalState) => GlobalState.mytabs);
  const initialState = {
    open: false,
    pic: []
  };

  const [state, setstate] = useState(initialState);

  const handleClick = () => setstate({ ...state, open: !state.open });

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
              action={
                <Confirm tab={tab} state={state} setstate={setstate} handleClose={handleClick} handleOpen={handleClick} />
              }
              className={classes.header}
            />
            <CardMedia
              onClick={openThisTab(tab._id, tab.name)}
              className={classes.image}
              image={tab.imgPath}
              title={tab.name}
            />
          </Card>
        ))
      }
    </div>
  );
};
