import React, { useState } from "react";
import { Container, makeStyles, IconButton, Typography, Tooltip, TextField, InputAdornment, Paper, Avatar } from "@material-ui/core";
import GroupIcon from '@material-ui/icons/Group';
import cx from 'classnames';
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import { sendInvToBeFriend } from "../../../store/Socket/actions";
import { decryptUserData } from '../../../Utils/crypt';

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
    backgroundColor: (props) => props.theme?.color || "#6e00c8"
  }
}));

export default () => {
  const { mytheme, token, userID } = useSelector((GlobalState) => GlobalState.userData.datas);
  const [isOpen, setOpen] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [result, setResult] = useState([]);
  const classes = useStyles({ theme: mytheme, isOpen });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios({
      url: `${process.env.API_URL}auth/user/find`,
      method: 'POST',
      data: {
        friendName,
        userID
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(res);
    const decryptedResult = decryptUserData(res.data.users);
    setResult(decryptedResult);
  };

  const handleClickSendInvitation = (user) => () => {
    dispatch(sendInvToBeFriend({ ...user }));
    console.log(user);
  };

  return (
    <Container className={classes.root}>
      <Container className={cx(classes.container, classes.menu)}>
        <Tooltip title="Votre liste d'amis">
          <IconButton onClick={() => setOpen(!isOpen)} className={classes.menuButton}>
            <GroupIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
      </Container>
      <Container className={cx(classes.container, classes.body)}>
        <Typography className={classes.title} component="h2"> Liste d'amis </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.search}
            onChange={(e) => setFriendName(e.target.value.toLowerCase())}
            value={friendName}
            variant="outlined"
            label="Rechercher quelqu'un"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </form>
        <Container className={classes.result}>
          {
            result && result.map((user) => <Paper key={user._id} className={classes.paper}>
              <Avatar className={classes.avatar}>
                {user.username.substring(0, 1)}
              </Avatar>
              <Typography className={classes.username}> {user.username} </Typography>
              <IconButton onClick={handleClickSendInvitation(user)}>
                <MailIcon className={classes.invitation} />
              </IconButton>
            </Paper>)
          }
        </Container>
      </Container>
    </Container>
  );
};
