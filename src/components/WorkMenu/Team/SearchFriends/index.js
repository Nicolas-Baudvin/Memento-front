import React, { useState } from "react";
import {
  Typography, TextField, InputAdornment, Avatar, Container, IconButton, Paper
} from "@material-ui/core";
import Axios from "axios";
import { useDispatch } from "react-redux";


// Icons
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';

// Actions
import { failMessage } from '../../../../store/Popup/actions';

// Utils
import { decryptUserData } from "../../../../Utils/crypt";
import { sendInvToBeFriend } from "../../../../store/Socket/actions";

export default ({ classes, token, userID }) => {
  const dispatch = useDispatch();
  const [friendName, setFriendName] = useState('');
  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!friendName) {
      return dispatch(failMessage("Echec de la recherche : Elle doit comporter au moins 1 caractère"));
    }

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
    const decryptedResult = decryptUserData(res.data.users);
    setResult(decryptedResult);
  };

  const handleClickSendInvitation = (user) => () => {
    dispatch(sendInvToBeFriend(user));
  };

  const handleSearchFriend = (e) => {
    setFriendName(e.target.value.toLowerCase());
    if (!e.target.value.length) {
      setResult([]);
    }
  };

  return (
    <>
      <Typography className={classes.title} component="h2"> Liste d'amis </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.search}
          onChange={handleSearchFriend}
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
      {
        result.length > 0 && <Container className={classes.result}>
          {
            result.map((user) => <Paper key={user._id} className={classes.paper}>
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
      }
    </>
  );
};
