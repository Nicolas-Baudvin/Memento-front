import React, { useState } from "react";
import {
  Container,
  makeStyles,
} from "@material-ui/core";
import cx from 'classnames';
import { useSelector } from "react-redux";

// Components
import SearchFriends from './SearchFriends';
import FriendsList from './Friends';
import MenuButton from './MenuButton';

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    right: (props) => (props.isOpen ? "0" : "-18.7em"),
    top: '8em',
    width: 'max-content',
    display: 'flex',
    padding: '0',
    borderRadius: '5px',
    zIndex: '1000',
    transition: ".3s ease-in-out"
  },
  container: {
    padding: '.5em',
    margin: '0',
    width: 'max-content'
  },
  menu: {
    backgroundColor: (props) => props.theme?.color || "#6e00c8",
    borderRadius: '5px 0 0 5px',
    height: '59px'
  },
  body: {
    borderRadius: '0 5px 5px 0',
    width: '260px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,.3)',
    backgroundColor: 'rgba(250,250,250,.9)'
  },
  icon: {
    color: '#fff',
  },
  menuButton: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.3)'
    }
  },
  search: {
    margin: '1em 0'
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: (props) => props.theme.color || "#6e00c8"
  },
  invitation: {
    color: (props) => props.theme.color || "#6e00c8"
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: '.2em 1em',
    margin: '.5em auto'
  },
  username: {
    fontWeight: 'bold'
  },
  result: {
    width: '100%',
    height: '150px',
    overflowY: 'auto',
    padding: '0'
  },
  avatar: {
    backgroundColor: (props) => props.theme?.color || "#6e00c8",
    fontWeight: 'bold'
  },
  iconMenu: {
    color: (props) => props.theme?.color || "#6e00c8"
  }
}));

export default () => {
  const { mytheme, token, userID } = useSelector((GlobalState) => GlobalState.userData.datas);
  const { list } = useSelector((GlobalState) => GlobalState.friends);
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles({ theme: mytheme, isOpen });

  return (
    <Container className={classes.root}>
      <MenuButton classes={classes} setOpen={setOpen} isOpen={isOpen} />
      <Container className={cx(classes.container, classes.body)}>
        <SearchFriends classes={classes} token={token} userID={userID} />
        <FriendsList classes={classes} list={list} />
      </Container>
    </Container>
  );
};
