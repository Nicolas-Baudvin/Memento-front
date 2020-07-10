/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { Card, CardHeader, makeStyles, Avatar, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from "react-redux";
import cx from 'classnames';

// components
import Confirm from '../../Confirm';

// Styles & Icons
import "../../style.scss";

const useStyles = makeStyles(() => ({
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
    margin: '1em',
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

export default ({ openThisTab, tabs }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  const [isFocus, setFocus] = useState({});
  const initialState = {
    open: false,
    pic: []
  };

  const [state, setstate] = useState(initialState);

  const handleClick = (tab) => () => setstate({ ...state, open: !state.open, selectedTab: tab });

  return (
    <div className="workmenu-tabs">
      {
        tabs.map((tab) => {
          return (
            <Card className={cx(classes.root, { [classes.focus]: isFocus[tab._id] })} key={tab._id}>
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
                <input
                  type="image"
                  component="input"
                  onClick={openThisTab(tab._id, tab.name)}
                  className={classes.image}
                  src={tab.resizedImgPath}
                  alt="background du tableau"
                  onFocus={() => setFocus({ ...isFocus, [tab._id]: true })}
                  onBlur={() => setFocus({ ...isFocus, [tab._id]: false })}
                />
              </Tooltip>
            </Card>
          );
        })
      }
    </div>
  );
};
